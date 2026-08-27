import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return <main className="not-found-page"><div className="not-found-inner"><p className="eyebrow">PAGE & SLIDE · 404</p><h1>Page Not Found</h1><p>The page you are looking for is not available. Return to the storefront to browse services and current pricing.</p><button type="button" className="primary-action" onClick={() => setLocation("/")}><ArrowLeft size={16} aria-hidden="true" /> Back to home</button></div></main>;
}
