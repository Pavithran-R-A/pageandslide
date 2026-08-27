import { getRouteMetadata, PUBLIC_SITE_URL, SITE_METADATA, toSiteUrl } from "@/config/site";
import { useEffect } from "react";

function setMeta(selector: string, content: string, attributes: Readonly<Record<string, string>>): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function RouteMeta({ pathname }: Readonly<{ pathname: string }>) {
  const route = getRouteMetadata(pathname);
  useEffect(() => {
    const isProductionOrigin = window.location.origin === PUBLIC_SITE_URL;
    const indexDirective = isProductionOrigin && route.indexable ? "index, follow" : "noindex, nofollow";
    document.title = route.title;
    setMeta('meta[name="description"]', route.description, { name: "description" });
    setMeta('meta[name="robots"]', indexDirective, { name: "robots" });
    setMeta('meta[property="og:title"]', route.title, { property: "og:title" });
    setMeta('meta[property="og:description"]', route.description, { property: "og:description" });
    setMeta('meta[property="og:url"]', toSiteUrl(route.path), { property: "og:url" });
    setMeta('meta[property="og:image"]', SITE_METADATA.socialImageUrl, { property: "og:image" });
    setMeta('meta[name="twitter:title"]', route.title, { name: "twitter:title" });
    setMeta('meta[name="twitter:description"]', route.description, { name: "twitter:description" });
    setMeta('meta[name="twitter:image"]', SITE_METADATA.socialImageUrl, { name: "twitter:image" });
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = toSiteUrl(route.path);
  }, [route, pathname]);
  return null;
}

