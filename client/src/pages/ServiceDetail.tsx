import { StorefrontLayout } from "@/components/StorefrontLayout";
import { useCart } from "@/contexts/CartContext";
import { findService, SERVICE_PAGE_DETAILS } from "@/data/services";
import { formatRupees } from "@/lib/pricing";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function ServiceDetail({ serviceId }: Readonly<{ serviceId: string }>) {
  const service = findService(serviceId);
  const detail = service ? SERVICE_PAGE_DETAILS[service.id === "resume" ? "resumes" : service.id] : null;
  const { addItem } = useCart();
  const [addedKey, setAddedKey] = useState<string | null>(null);

  if (!service || !detail) return null;
  const activeService = service;

  function addTier(tierId: string, label: string): void {
    addItem(activeService.id, tierId);
    setAddedKey(tierId);
    window.setTimeout(() => setAddedKey(null), 1200);
    const announcement = document.getElementById("service-add-announcement");
    if (announcement) announcement.textContent = `${label} added to your order.`;
  }

  return <StorefrontLayout><main><section className="detail-hero" aria-labelledby="service-detail-title"><a className="back-link detail-back" href="/#services"><ArrowLeft size={16} aria-hidden="true" /> Back to services</a><p className="eyebrow">{detail.eyebrow}</p><h1 id="service-detail-title">{detail.headline}</h1><p className="detail-intro">{detail.intro}</p><p className="detail-microcopy">Editable output <span aria-hidden="true">·</span> Clear pricing <span aria-hidden="true">·</span> Direct ordering</p></section><section className="detail-content"><div className="detail-main"><section className="detail-block" aria-labelledby="included-title"><p className="eyebrow">THE SERVICE</p><h2 id="included-title">What is included</h2><ul className="detail-list">{detail.included.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="detail-block" aria-labelledby="provide-title"><p className="eyebrow">YOUR BRIEF</p><h2 id="provide-title">What you provide</h2><ul className="detail-list detail-list--muted">{detail.customerProvides.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="detail-block" aria-labelledby="delivery-title"><p className="eyebrow">DELIVERY</p><h2 id="delivery-title">A file you can keep working with.</h2><p>{detail.output}</p><p>{detail.turnaround}</p><p>{detail.revisions}</p></section><section className="detail-block" aria-labelledby="uses-title"><p className="eyebrow">GOOD FOR</p><h2 id="uses-title">Appropriate use cases</h2><div className="use-case-grid">{detail.useCases.map((item) => <span key={item}>{item}</span>)}</div></section><section className="detail-block detail-faq" aria-labelledby="detail-faq-title"><p className="eyebrow">QUESTIONS</p><h2 id="detail-faq-title">A few clear answers.</h2>{detail.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span aria-hidden="true">+</span></summary><p>{faq.answer}</p></details>)}</section></div><aside className="detail-aside" aria-labelledby="pricing-title"><div className="detail-price-card"><p className="eyebrow">CURRENT PRICING</p><h2 id="pricing-title">Choose your size.</h2><div className="detail-tiers">{activeService.tiers.map((tier) => <div className="detail-tier" key={tier.id}><div><strong>{tier.label}</strong><small>{tier.addable === false ? "Add-on rate above package" : tier.unit}</small></div><b>{formatRupees(tier.price)}{tier.addable === false ? " each" : ""}</b>{tier.addable === false ? <span className="tier-note">Not standalone</span> : <button type="button" className="add-tier" onClick={() => addTier(tier.id, `${activeService.name} — ${tier.label}`)}>{addedKey === tier.id ? "Added" : "Add"}</button>}</div>)}</div><a className="secondary-action detail-order-link" href="/#services">See all services <ArrowUpRight size={16} aria-hidden="true" /></a><p className="detail-contact-note">After adding a package, open your cart and send the brief through WhatsApp or Telegram.</p></div></aside></section></main><p id="service-add-announcement" className="sr-only" aria-live="polite"></p></StorefrontLayout>;
}
