import { getRouteMetadata, ORGANIZATION_DETAILS, SITE_METADATA, SITE_URL, toSiteUrl } from "@/config/site";
import { SERVICE_CATEGORIES, findService, SERVICE_PAGE_DETAILS } from "@/data/services";
import { useLocation } from "wouter";

export function createStructuredData(pathname = "/"): Readonly<Record<string, unknown>> {
  const route = getRouteMetadata(pathname);
  const serviceId = pathname === "/resumes" ? "resume" : pathname.replace(/^\//, "");
  const selectedService = SERVICE_PAGE_DETAILS[route.path] ? findService(serviceId) : null;
  const catalogueServices = SERVICE_CATEGORIES.map((service) => ({
    "@type": "Service",
    "@id": `${SITE_URL}#service-${service.id}`,
    name: service.name,
    description: service.description,
    provider: { "@id": ORGANIZATION_DETAILS.id },
    url: toSiteUrl(service.id === "resume" ? "/resumes" : `/${service.id}`),
    offers: service.tiers.filter((tier) => tier.addable !== false).map((tier) => ({
      "@type": "Offer",
      name: tier.label,
      price: tier.price,
      priceCurrency: "INR",
      url: toSiteUrl(service.id === "resume" ? "/resumes" : `/${service.id}`),
    })),
  }));
  const graph: readonly Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_DETAILS.id,
      name: ORGANIZATION_DETAILS.name,
      url: ORGANIZATION_DETAILS.url,
      logo: ORGANIZATION_DETAILS.logo,
      description: ORGANIZATION_DETAILS.description,
      telephone: ORGANIZATION_DETAILS.telephone,
      contactPoint: { "@type": "ContactPoint", contactType: "customer service", telephone: ORGANIZATION_DETAILS.telephone, url: ORGANIZATION_DETAILS.whatsappUrl },
      ...(ORGANIZATION_DETAILS.telegramUrl ? { sameAs: [ORGANIZATION_DETAILS.telegramUrl] } : {}),
    },
    { "@type": "WebSite", "@id": `${SITE_URL}#website`, name: ORGANIZATION_DETAILS.name, url: SITE_URL, description: SITE_METADATA.description, publisher: { "@id": ORGANIZATION_DETAILS.id } },
    { "@type": "WebPage", "@id": `${toSiteUrl(route.path)}#webpage`, url: toSiteUrl(route.path), name: route.title, description: route.description, isPartOf: { "@id": `${SITE_URL}#website` }, ...(selectedService ? { mainEntity: { "@id": `${SITE_URL}#service-${selectedService.id}` } } : {}) },
    ...catalogueServices,
  ];
  return { "@context": "https://schema.org", "@graph": graph };
}

export function SearchStructuredData() {
  const [location] = useLocation();
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createStructuredData(location)) }} />;
}
