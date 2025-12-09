import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { OAuth2Client } from "google-auth-library";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

import { ENV } from "./env";

export function registerOAuthRoutes(app: Express) {
  // Google OAuth Login
  app.get("/api/auth/google", (req: Request, res: Response) => {
    try {
      if (!ENV.googleClientId || !ENV.googleClientSecret) {
        throw new Error("Google credentials not configured");
      }

      const protocol = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      const callbackUrl = ENV.callbackUrl || `${protocol}://${host}/api/auth/google/callback`;

      const client = new OAuth2Client(ENV.googleClientId, ENV.googleClientSecret, callbackUrl);
      const authorizeUrl = client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
      });

      res.redirect(authorizeUrl);
    } catch (error) {
      console.error("[Auth] Google config error", error);
      res.redirect("/?error=config_error");
    }
  });

  // Google OAuth Callback
  app.get("/api/auth/google/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    if (!code) {
      res.status(400).json({ error: "No code provided" });
      return;
    }

    try {
      const protocol = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers["x-forwarded-host"] || req.headers.host;
      // Must match the one used in generateAuthUrl exactly
      const callbackUrl = ENV.callbackUrl || `${protocol}://${host}/api/auth/google/callback`;

      const client = new OAuth2Client(ENV.googleClientId, ENV.googleClientSecret, callbackUrl);
      const { tokens } = await client.getToken(code);
      client.setCredentials(tokens);

      const ticket = await client.verifyIdToken({
        idToken: tokens.id_token!,
        audience: ENV.googleClientId,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.sub) {
        throw new Error("Invalid token payload");
      }

      const openId = `google_${payload.sub}`;
      const email = payload.email || "";

      // Logic to determine role: If email matches ADMIN_EMAIL, elevate to admin
      const role = (ENV.adminEmail && email === ENV.adminEmail) ? "admin" : "user";
      // Manually upsert to include role
      const dbInstance = await db.getDb();
      if (dbInstance) {
        // We use the db.upsertUser helper but it might not expose 'role' if typed narrowly, 
        // allow standard upsert then separate check or just pass it if helper allows.
        // Checking db.ts again... helper takes InsertUser which has role. 
        await db.upsertUser({
          openId: openId,
          name: payload.name || "Google User",
          email: email,
          loginMethod: "google",
          role: role as "admin" | "user",
          lastSignedIn: new Date(),
        });
      }

      // Create session
      const sessionToken = await sdk.createSessionToken(openId, {
        name: payload.name || "Google User",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect("/");

    } catch (error) {
      console.error("[Auth] Google Login failed", error);
      res.redirect("/?error=google_login_failed");
    }
  });

  app.get("/api/oauth/login", (req: Request, res: Response) => {
    // Determine the callback URL based on the request headers
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const callbackUrl = `${protocol}://${host}/api/oauth/callback`;

    // Encode the callback URL in the state parameter
    const state = btoa(callbackUrl);

    // Construct the authorization URL
    // Defaulting to manus.im if oAuthServerUrl is api.manus.im, or just using oAuthServerUrl
    // Assuming the auth service handles /authorize
    const authUrl = `${ENV.oAuthServerUrl}/authorize?client_id=${ENV.appId}&response_type=code&state=${state}&redirect_uri=${encodeURIComponent(callbackUrl)}`;

    res.redirect(authUrl);
  });

  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const tokenResponse = await sdk.exchangeCodeForToken(code, state);
      const userInfo = await sdk.getUserInfo(tokenResponse.accessToken);

      if (!userInfo.openId) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      await db.upsertUser({
        openId: userInfo.openId,
        name: userInfo.name || null,
        email: userInfo.email ?? null,
        loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });

  // Local password login
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    const { password } = req.body;

    if (password !== ENV.adminPassword) {
      res.status(401).json({ error: "密碼錯誤" });
      return;
    }

    try {
      const adminOpenId = "admin-user";

      // Ensure admin user exists in DB
      await db.upsertUser({
        openId: adminOpenId,
        name: "Admin",
        email: "admin@local",
        loginMethod: "password",
        lastSignedIn: new Date(),
      });

      // Create session
      const sessionToken = await sdk.createSessionToken(adminOpenId, {
        name: "Admin",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.json({ success: true });
    } catch (error) {
      console.error("[Auth] Login failed", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.json({ success: true });
  });
}
