/** Design integrity: retain SoftBazzar's warm-ivory editorial layout; only concise, answer-oriented copy may change here. */
import { FaqSection } from "@/components/FaqSection";
import { FooterContactActions } from "@/components/FooterContactActions";
import { ServiceCatalogue } from "@/components/ServiceCatalogue";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/contexts/CartContext";
import { calculateSubtotal, formatRupees } from "@/lib/pricing";
import { ArrowDownRight, ArrowUpRight, ShoppingBag } from "lucide-react";
import { lazy, Suspense, useRef, useState } from "react";

const CartDialog = lazy(() => import("@/components/CartDialog").then((module) => ({ default: module.CartDialog })));
const OrderDetailsDialog = lazy(() => import("@/components/OrderDetailsDialog").then((module) => ({ default: module.OrderDetailsDialog })));

export default function Home() {
  const { items, itemCount } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [cartMessage, setCartMessage] = useState("");
  const cartTriggerRef = useRef<HTMLElement | null>(null);
  const subtotal = calculateSubtotal(items);

  function openCart(): void {
    const active = document.activeElement;
    cartTriggerRef.current = active instanceof HTMLElement ? active : null;
    setCartOpen(true);
  }

  function restoreCartFocus(): void { window.requestAnimationFrame(() => cartTriggerRef.current?.focus()); }

  return <div className="site-shell" id="top">
    <SiteHeader itemCount={itemCount} onOpenCart={openCart} />
    <main>
      <section className="hero-section" aria-labelledby="hero-title"><div className="hero-folio-mark" aria-hidden="true">SB<br /><span>26</span></div><div className="hero-content"><p className="eyebrow">FOR MCC STUDENTS</p><h1 id="hero-title">Present your work<br /><em>with confidence.</em></h1><p className="hero-copy">Presentation, report, notes and resume support for MCC students in Chennai — clear pricing, editable files and direct WhatsApp or Telegram ordering.</p><div className="hero-actions"><a className="primary-action" href="#services">Browse services <ArrowDownRight size={17} aria-hidden="true" /></a><a className="text-action" href="#how-it-works">How ordering works <span aria-hidden="true">→</span></a></div><p className="hero-microcopy">Same pricing across departments <span aria-hidden="true">·</span> Editable files included</p></div></section>
      <section className="trust-strip" aria-label="SoftBazzar principles"><div><strong>CLEAR PRICING</strong><span>Know the rate before you enquire.</span></div><div><strong>EDITABLE FILES</strong><span>Stay in control of final changes.</span></div><div><strong>DIRECT ORDERING</strong><span>Send the brief when you are ready.</span></div></section>
      <ServiceCatalogue onAdded={setCartMessage} />
      <section className="process-section" id="how-it-works" aria-labelledby="process-title"><div className="process-heading"><p className="eyebrow">HOW IT WORKS</p><h2 id="process-title">A short route from brief to order.</h2></div><ol className="process-list"><li><span>01</span><h3>Choose your service</h3><p>Select the format and size you need.</p></li><li><span>02</span><h3>Review your order</h3><p>Add your deadline and requirements.</p></li><li><span>03</span><h3>Send to SoftBazzar</h3><p>Continue through WhatsApp or Telegram and confirm availability.</p></li></ol></section>
      <FaqSection />
      <section className="final-cta"><p className="eyebrow">READY WHEN YOU ARE</p><h2>Have something<br /><em>due soon?</em></h2><p>Select what you need, review the price, and send us the details.</p><a href="#services" className="primary-action">Browse services <ArrowUpRight size={17} aria-hidden="true" /></a></section>
    </main>
    <footer className="site-footer"><div className="footer-top"><div><a href="#top" className="wordmark"><span className="monogram" aria-hidden="true">SB</span><span>SOFT<span className="wordmark-rule" />BAZZAR</span></a><p>Student presentation and document support.</p></div><nav aria-label="Footer navigation"><a href="#services">Services</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a><FooterContactActions /></nav></div><div className="footer-bottom"><span>© 2026 SoftBazzar. All rights reserved.</span><span>Independent student-support service. Not affiliated with Madras Christian College.</span></div></footer>
    <p className="sr-only" aria-live="polite">{cartMessage}</p>
    {itemCount > 0 && <button type="button" className="mobile-cart-bar" onClick={openCart}><span><ShoppingBag size={17} aria-hidden="true" /> {itemCount} {itemCount === 1 ? "item" : "items"}</span><strong>{formatRupees(subtotal)}</strong><b>View order <span aria-hidden="true">→</span></b></button>}
    <Suspense fallback={null}><CartDialog open={cartOpen} onOpenChange={setCartOpen} onCloseFocus={restoreCartFocus} onReview={() => { setCartOpen(false); setDetailsOpen(true); }} /><OrderDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} /></Suspense>
  </div>;
}
