import { ShoppingBag } from "lucide-react";

type SiteHeaderProps = Readonly<{ itemCount: number; onOpenCart: () => void }>;

export function SiteHeader({ itemCount, onOpenCart }: SiteHeaderProps) {
  return <header className="site-header"><div className="topbar-inner"><a href="/" className="wordmark" aria-label="Page & Slide home"><img src="/logo-mark.svg" alt="" aria-hidden="true" /><span>PAGE <span className="wordmark-ampersand" aria-hidden="true">&amp;</span> SLIDE</span></a><nav className="site-nav" aria-label="Primary navigation"><a href="/#services">Services</a><a href="/#how-it-works">How it works</a><a href="/#faq">FAQ</a><a href="/contact">Contact</a></nav><button className="cart-toggle" type="button" onClick={onOpenCart} aria-label={`Open cart, ${itemCount} items`}><ShoppingBag size={18} strokeWidth={1.7} aria-hidden="true" /><span>Cart</span>{itemCount > 0 && <span className="cart-count" aria-hidden="true">{itemCount}</span>}</button></div></header>;
}
