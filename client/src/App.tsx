import ErrorBoundary from "@/components/ErrorBoundary";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
function Router() { return <Switch><Route path="/" component={Home} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>; }
function App() { return <ErrorBoundary><ThemeProvider defaultTheme="light"><CartProvider><Router /></CartProvider></ThemeProvider></ErrorBoundary>; }
export default App;
