import { CartDialog } from "@/components/CartDialog";
import { FooterContactActions } from "@/components/FooterContactActions";
import { OrderDetailsDialog } from "@/components/OrderDetailsDialog";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/contexts/CartContext";
import { calculateSubtotal, formatRupees } from "@/lib/pricing";
import { ShoppingBag } from "lucide-react";
import { PropsWithChildren, useRef, useState } from "react";

export function StorefrontLayout({ children }: PropsWithChildren) {
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
    {children}
    <footer className="site-footer"><div className="footer-top"><div><a href="/" className="wordmark wordmark--footer" aria-label="SoftBazzar home"><img src="/logo-mark.svg" alt="" aria-hidden="true" /><span>SOFT<span className="wordmark-rule" />BAZZAR</span></a><p>Student presentation and document support.</p></div><nav aria-label="Footer navigation"><a href="/#services">Services</a><a href="/#how-it-works">How it works</a><a href="/#faq">FAQ</a><a href="/contact">Contact</a><a href="/accessibility">Accessibility</a><span className="footer-group-label">Policies</span><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/refunds">Refunds</a><a href="/delivery-revisions">Delivery</a><a href="/academic-integrity">Academic integrity</a><FooterContactActions /></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SoftBazzar. All rights reserved.</span><span>For college students generally. No college or university affiliation is claimed.</span></div></footer>
    <p className="sr-only" aria-live="polite">{cartMessage}</p>
    {itemCount > 0 && <button type="button" className="mobile-cart-bar" onClick={openCart}><span><ShoppingBag size={17} aria-hidden="true" /> {itemCount} {itemCount === 1 ? "item" : "items"}</span><strong>{formatRupees(subtotal)}</strong><b>View order <span aria-hidden="true">→</span></b></button>}
    <CartDialog open={cartOpen} onOpenChange={setCartOpen} onCloseFocus={restoreCartFocus} onReview={() => { setCartOpen(false); setDetailsOpen(true); }} />
    <OrderDetailsDialog open={detailsOpen} onOpenChange={setDetailsOpen} />
  </div>;
}
