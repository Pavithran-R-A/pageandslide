import { SERVICE_CATEGORIES } from "@/data/services";
import { formatRupees } from "@/lib/pricing";
import { useCart } from "@/contexts/CartContext";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type ServiceCatalogueProps = Readonly<{ onAdded: (message: string) => void }>;

export function ServiceCatalogue({ onAdded }: ServiceCatalogueProps) {
  const { addItem } = useCart();
  const [addedKey, setAddedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!addedKey) return;
    const timer = window.setTimeout(() => setAddedKey(null), 1200);
    return () => window.clearTimeout(timer);
  }, [addedKey]);

  function addTier(serviceId: string, tierId: string, label: string): void {
    addItem(serviceId, tierId);
    setAddedKey(`${serviceId}:${tierId}`);
    onAdded(`${label} added to your order.`);
  }

  return <section className="catalogue-section" id="services" aria-labelledby="services-title"><div className="catalogue-heading"><p className="eyebrow">SERVICE CATALOGUE</p><h2 id="services-title">Made to read clearly.<br />Priced the same way.</h2><p>Choose the format and scale that reflects your requirement. Every applicable service is delivered in an editable format.</p></div><div className="catalogue-list">{SERVICE_CATEGORIES.map((service) => { const detailPath = service.id === "resume" ? "/resumes" : `/${service.id}`; return <article id={`service-${service.id}`} className={`service-entry${service.featured ? " service-entry--featured" : ""}`} key={service.id}><div className="service-intro"><p className="service-index">{service.number}</p><h3><a href={detailPath}>{service.name}</a></h3><p>{service.description}</p><a className="service-detail-link" href={detailPath}>View service details <ArrowUpRight size={14} aria-hidden="true" /></a></div><div className="service-tiers" aria-label={`${service.name} pricing`}>{service.tiers.map((tier) => { const key = `${service.id}:${tier.id}`; const isAdded = addedKey === key; const isAddable = tier.addable !== false; const rateText = isAddable ? formatRupees(tier.price) : `${formatRupees(tier.price)} each`; return <div className="tier-row" key={tier.id}><div className="tier-label"><span>{tier.label}</span>{tier.unit.startsWith("per") && <small>{isAddable ? tier.unit : "above package"}</small>}</div><strong>{rateText}</strong>{isAddable ? <button type="button" className="add-tier" onClick={() => addTier(service.id, tier.id, `${service.name} — ${tier.label}`)}>{isAdded ? "Added" : "Add"}</button> : <span className="tier-note" aria-label={`${tier.label} is an add-on rate and cannot be added alone`}>Add-on rate</span>}</div>; })}</div></article>; })}</div></section>;
}
