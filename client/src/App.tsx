import { Toaster } from "@/components/ui/sonner";
import HtmlLangSync from "./components/HtmlLangSync";
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
import AdminBulkEdit from "./pages/AdminBulkEdit";
import AdminEventEdit from "./pages/AdminEventEdit";
import FederationDashboard from "./pages/FederationDashboard";
import GorrosNatacion from "./pages/GorrosNatacion";
import GorrosNatacionMain from "./pages/GorrosNatacionMain";
import GorrosSilicona from "./pages/GorrosSilicona";
import GorrosGamuza from "./pages/GorrosGamuza";
import GorrosLatex from "./pages/GorrosLatex";
import GorrosPeloLargo from "./pages/GorrosPeloLargo";
import GorrosTela from "./pages/GorrosTela";
import BlogSwimmingEvents2026 from "./pages/BlogSwimmingEvents2026";
import BlogGuiaClub from "./pages/BlogGuiaClub";
import WidgetCalendar from "./pages/WidgetCalendar";
import WidgetBuilder from "./pages/WidgetBuilder";
import WidgetDemo from "./pages/WidgetDemo";
import BulkImport from "./pages/BulkImport";
import Login from "./pages/Login";
import AdminRegister from "./pages/AdminRegister";
import AdminCapPricing from "./pages/AdminCapPricing";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import SobreNosotros from "./pages/SobreNosotros";

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
      <Route path="/blog/guia-pedido-gorros-club" component={BlogGuiaClub} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/enviar-evento" component={SubmitEvent} />
      <Route path="/perfil" component={UserProfile} />
      <Route path="/mis-favoritos" component={UserFavorites} />
      <Route path="/admin" component={Admin} />
      <Route path="/admin/contacts" component={AdminContacts} />
      <Route path="/admin/bulk-import" component={BulkImport} />
      <Route path="/admin/bulk-edit" component={AdminBulkEdit} />
      <Route path="/admin/events/:id" component={AdminEventEdit} />
      <Route path="/admin/register" component={AdminRegister} />
      <Route path="/admin/cap-pricing" component={AdminCapPricing} />
      <Route path="/login" component={Login} />
      <Route path="/federacion" component={FederationDashboard} />
      <Route path="/gorros-natacion" component={GorrosNatacionMain} />
      <Route path="/gorros-natacion/silicona" component={GorrosSilicona} />
      <Route path="/gorros-natacion/gamuza" component={GorrosGamuza} />
      <Route path="/gorros-natacion/latex" component={GorrosLatex} />
      <Route path="/gorros-natacion/pelo-largo" component={GorrosPeloLargo} />
      <Route path="/gorros-natacion/tela" component={GorrosTela} />
      <Route path="/widget/calendar" component={WidgetCalendar} />
      <Route path="/widget/builder" component={WidgetBuilder} />
      <Route path="/widget/demo" component={WidgetDemo} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
      <Route path="/sobre-nosotros" component={SobreNosotros} />
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
        <HtmlLangSync />
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
