import ErrorBoundary from "@/components/ErrorBoundary";
import { RouteMeta } from "@/components/RouteMeta";
import { SearchStructuredData } from "@/components/SearchStructuredData";
import { CartProvider } from "@/contexts/CartContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ACCESSIBILITY_SECTIONS, ACADEMIC_SECTIONS, DELIVERY_SECTIONS, PRIVACY_SECTIONS, REFUND_SECTIONS, TERMS_SECTIONS } from "@/data/legal";
import Home from "@/pages/Home";
import { ContactPage, LegalPage } from "@/pages/LegalPage";
import { ServiceDetail } from "@/pages/ServiceDetail";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";

const TermsPage = () => <LegalPage title="Terms of Service" intro="The plain-English terms for using Page & Slide's digital student-support services." sections={TERMS_SECTIONS} />;
const PrivacyPage = () => <LegalPage title="Privacy Policy" intro="What stays in your browser, what is shared only when you choose a contact channel, and how to make a request." sections={PRIVACY_SECTIONS} />;
const RefundPage = () => <LegalPage title="Refunds & cancellations" intro="A fair route for cancellation, delivery failure, priority deadlines and changed scope." sections={REFUND_SECTIONS} />;
const DeliveryPage = () => <LegalPage title="Delivery & revisions" intro="Turnaround, priority pricing, editable delivery and what counts as a minor revision." sections={DELIVERY_SECTIONS} />;
const AcademicPage = () => <LegalPage title="Academic integrity & acceptable use" intro="Legitimate student support, clear boundaries and your responsibility to follow institutional rules." sections={ACADEMIC_SECTIONS} />;
const AccessibilityPage = () => <LegalPage title="Accessibility statement" intro="Our ongoing WCAG 2.2 AA-oriented approach to a readable, keyboard-ready storefront." sections={ACCESSIBILITY_SECTIONS} />;

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/presentations" component={() => <ServiceDetail serviceId="presentations" />} /><Route path="/assignment-support" component={() => <ServiceDetail serviceId="assignment-support" />} /><Route path="/project-reports" component={() => <ServiceDetail serviceId="project-reports" />} /><Route path="/notes" component={() => <ServiceDetail serviceId="notes" />} /><Route path="/resumes" component={() => <ServiceDetail serviceId="resume" />} /><Route path="/terms" component={TermsPage} /><Route path="/privacy" component={PrivacyPage} /><Route path="/refunds" component={RefundPage} /><Route path="/delivery-revisions" component={DeliveryPage} /><Route path="/academic-integrity" component={AcademicPage} /><Route path="/contact" component={ContactPage} /><Route path="/accessibility" component={AccessibilityPage} /><Route path="/404" component={NotFound} /><Route component={NotFound} /></Switch>;
}

function App() {
  const [location] = useLocation();
  return <ErrorBoundary><RouteMeta pathname={location} /><SearchStructuredData /><ThemeProvider defaultTheme="light"><CartProvider><Router /></CartProvider></ThemeProvider></ErrorBoundary>;
}

export default App;
