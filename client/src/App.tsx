import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicProvider } from "./contexts/MusicContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Features from "./pages/Features";
import Wellness from "./pages/Wellness";
import Farm from "./pages/Farm";
import Lifestyle from "./pages/Lifestyle";
import Contact from "./pages/Contact";
import VideoTour from "./pages/VideoTour";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Admin from "./pages/Admin";
import ArticleEditor from "./pages/ArticleEditor";
import ArticlePreview from "./pages/ArticlePreview";
import Dashboard from "./pages/Dashboard";
import AuthorsManagement from "./pages/AuthorsManagement";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackgroundMusic from "./components/BackgroundMusic";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/features" component={Features} />
      <Route path="/wellness" component={Wellness} />
      <Route path="/farm" component={Farm} />
      <Route path="/lifestyle" component={Lifestyle} />
      <Route path="/contact" component={Contact} />
      <Route path="/video-tour" component={VideoTour} />
      <Route path="/articles" component={Articles} />
      <Route path="/articles/:slug" component={ArticleDetail} />
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/article/:id/preview" component={ArticlePreview} />
      <Route path="/admin/article/:id" component={ArticleEditor} />
      <Route path="/admin/authors" component={AuthorsManagement} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <MusicProvider>
          <TooltipProvider>
            <Toaster position="bottom-right" />
            <BackgroundMusic />
            <Navbar />
            <Router />
            <Footer />
          </TooltipProvider>
        </MusicProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
