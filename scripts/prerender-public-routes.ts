import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PUBLIC_ROUTES, getRouteMetadata, SITE_METADATA, toSiteUrl } from "../client/src/config/site";

const root = path.resolve(import.meta.dirname, "..");
const outputRoot = path.join(root, "dist", "public");

function escapeHtml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function replaceAttribute(html: string, pattern: RegExp, value: string): string {
  return html.replace(pattern, `$1${escapeHtml(value)}$2`);
}

function renderInitialContent(pathname: string): string {
  const route = getRouteMetadata(pathname);
  const routeLabel = pathname === "/" ? "PRESENTATIONS · REPORTS · NOTES · RESUMES" : "SOFTBAZZAR · COLLEGE STUDENT SUPPORT";
  return `<main class="prerender-content"><p>${escapeHtml(routeLabel)}</p><h1>${escapeHtml(route.h1)}</h1><p>${escapeHtml(route.summary)}</p><p><a href="${escapeHtml(toSiteUrl("/contact"))}">Contact SoftBazzar</a></p></main>`;
}

function renderRouteDocument(template: string, pathname: string): string {
  const route = getRouteMetadata(pathname);
  const preview = process.env.VERCEL_ENV === "preview";
  let html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
  html = replaceAttribute(html, /(<meta name="description" content=")[^"]*("[^>]*>)/, route.description);
  html = replaceAttribute(html, /(<meta name="robots" content=")[^"]*("[^>]*>)/, preview ? "noindex, nofollow" : route.indexable ? "index, follow" : "noindex, nofollow");
  html = replaceAttribute(html, /(<link rel="canonical" href=")[^"]*("[^>]*>)/, toSiteUrl(route.path));
  html = replaceAttribute(html, /(<meta property="og:title" content=")[^"]*("[^>]*>)/, route.title);
  html = replaceAttribute(html, /(<meta property="og:description" content=")[^"]*("[^>]*>)/, route.description);
  html = replaceAttribute(html, /(<meta property="og:url" content=")[^"]*("[^>]*>)/, toSiteUrl(route.path));
  html = replaceAttribute(html, /(<meta name="twitter:title" content=")[^"]*("[^>]*>)/, route.title);
  html = replaceAttribute(html, /(<meta name="twitter:description" content=")[^"]*("[^>]*>)/, route.description);
  return html.replace(/<div id="root">.*?<\/div>/s, `<div id="root">${renderInitialContent(pathname)}</div>`);
}

async function main(): Promise<void> {
  const template = await readFile(path.join(outputRoot, "index.html"), "utf8");
  for (const route of PUBLIC_ROUTES) {
    const destination = route.path === "/" ? path.join(outputRoot, "index.html") : path.join(outputRoot, route.path.slice(1), "index.html");
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, renderRouteDocument(template, route.path), "utf8");
  }
  await writeFile(path.join(outputRoot, "_softbazzar-prerendered.txt"), `Generated ${PUBLIC_ROUTES.length} public route documents from ${SITE_METADATA.canonicalUrl}\n`, "utf8");
}

await main();
