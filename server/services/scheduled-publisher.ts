import { eq, and, lte, isNotNull } from "drizzle-orm";
import { getDb } from "../db";
import { articles } from "../../drizzle/schema";

/**
 * Scheduled Publisher Service
 * Automatically publishes articles when their scheduled time is reached
 */
export class ScheduledPublisher {
  private intervalId: NodeJS.Timeout | null = null;
  private isRunning = false;

  /**
   * Start the scheduled publisher service
   * Checks every minute for articles that need to be published
   */
  start() {
    if (this.isRunning) {
      console.log("[ScheduledPublisher] Already running");
      return;
    }

    this.isRunning = true;
    console.log("[ScheduledPublisher] Starting service...");

    // Run immediately on start
    this.checkAndPublish();

    // Then run every minute
    this.intervalId = setInterval(() => {
      this.checkAndPublish();
    }, 60000); // 60 seconds

    console.log("[ScheduledPublisher] Service started successfully");
  }

  /**
   * Stop the scheduled publisher service
   */
  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log("[ScheduledPublisher] Service stopped");
  }

  /**
   * Check for articles that need to be published and publish them
   */
  private async checkAndPublish() {
    try {
      const db = await getDb();
      if (!db) {
        console.error("[ScheduledPublisher] Database connection failed");
        return;
      }

      const now = new Date();

      // Find all draft articles with scheduledPublishAt <= now
      const articlesToPublish = await db.query.articles.findMany({
        where: and(
          eq(articles.status, "draft"),
          isNotNull(articles.scheduledPublishAt),
          lte(articles.scheduledPublishAt, now)
        ),
      });

      if (articlesToPublish.length === 0) {
        // No articles to publish
        return;
      }

      console.log(
        `[ScheduledPublisher] Found ${articlesToPublish.length} article(s) to publish`
      );

      // Publish each article
      for (const article of articlesToPublish) {
        try {
          await db
            .update(articles)
            .set({
              status: "published",
              publishedAt: now,
            })
            .where(eq(articles.id, article.id));

          console.log(
            `[ScheduledPublisher] ✅ Published article: "${article.title}" (ID: ${article.id})`
          );
        } catch (error) {
          console.error(
            `[ScheduledPublisher] ❌ Failed to publish article ID ${article.id}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("[ScheduledPublisher] Error in checkAndPublish:", error);
    }
  }

  /**
   * Get the current status of the service
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      intervalId: this.intervalId !== null,
    };
  }
}

// Export a singleton instance
export const scheduledPublisher = new ScheduledPublisher();
