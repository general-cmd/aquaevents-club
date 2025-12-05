import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Federations from "./pages/Federations";
import FederationDetail from "./pages/FederationDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import SubmitEvent from "./pages/SubmitEvent";
import UserProfile from "./pages/UserProfile";
import UserFavorites from "./pages/UserFavorites";
import Admin from "./pages/Admin";
import AdminContacts from "./pages/AdminContacts";
import FederationDashboard from "./pages/FederationDashboard";
import GorrosNatacion from "./pages/GorrosNatacion";
import BlogSwimmingEvents2026 from "./pages/BlogSwimmingEvents2026";
import WidgetCalendar from "./pages/WidgetCalendar";
import WidgetBuilder from "./pages/WidgetBuilder";
import WidgetDemo from "./pages/WidgetDemo";
import BulkImport from "./pages/BulkImport";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/eventos" component={Events} />
      <Route path="/eventos/:id" component={EventDetail} />
      <Route path="/federaciones" component={Federations} />
      <Route path="/federaciones/:id" component={FederationDetail} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/eventos-natacion-espana-2026" component={BlogSwimmingEvents2026} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/enviar-evento" component={SubmitEvent} />
      <Route path="/perfil" component={UserProfile} />
      <Route path="/mis-favoritos" component={UserFavorites} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/contacts" component={AdminContacts} />
      <Route path="/admin/bulk-import" component={BulkImport} />
      <Route path="/federacion" component={FederationDashboard} />
      <Route path="/gorros-natacion" component={GorrosNatacion} />
      <Route path="/widget/calendar" component={WidgetCalendar} />
      <Route path="/widget/builder" component={WidgetBuilder} />
      <Route path="/widget/demo" component={WidgetDemo} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
