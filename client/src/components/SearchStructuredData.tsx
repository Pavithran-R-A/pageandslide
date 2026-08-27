/**
 * Design integrity: this nonvisual component only publishes truthful structured data.
 * It intentionally leaves SoftBazzar's approved warm-ivory editorial composition unchanged.
 */
import { ORGANIZATION_DETAILS, SITE_METADATA, SITE_URL } from "@/config/site";
import { SERVICE_CATEGORIES } from "@/data/services";

const organizationReference = { "@id": ORGANIZATION_DETAILS.id } as const;

const catalogueServices = SERVICE_CATEGORIES.map((service) => ({
  "@type": "Service",
  "@id": `${SITE_URL}#service-${service.id}`,
  name: service.name,
  description: service.description,
  provider: organizationReference,
  offers: service.tiers
    .filter((tier) => tier.addable !== false)
    .map((tier) => ({
      "@type": "Offer",
      name: tier.label,
      price: tier.price,
      priceCurrency: "INR",
      url: `${SITE_URL}#services`,
    })),
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_DETAILS.id,
      name: ORGANIZATION_DETAILS.name,
      url: ORGANIZATION_DETAILS.url,
      logo: ORGANIZATION_DETAILS.logo,
      description: ORGANIZATION_DETAILS.description,
      telephone: ORGANIZATION_DETAILS.telephone,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: ORGANIZATION_DETAILS.telephone,
        url: ORGANIZATION_DETAILS.whatsappUrl,
      },
      sameAs: ORGANIZATION_DETAILS.telegramUrl ? [ORGANIZATION_DETAILS.telegramUrl] : [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      name: ORGANIZATION_DETAILS.name,
      url: SITE_URL,
      description: SITE_METADATA.description,
      publisher: organizationReference,
    },
    ...catalogueServices,
  ],
};

export function SearchStructuredData() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />;
}
