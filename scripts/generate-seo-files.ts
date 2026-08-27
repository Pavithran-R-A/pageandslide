import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createRobotsTxt, createSitemapXml } from "../client/src/config/site";

const publicDirectory = path.resolve(import.meta.dirname, "../client/public");
await mkdir(publicDirectory, { recursive: true });
const isPreview = process.env.VERCEL_ENV === "preview";
await writeFile(path.join(publicDirectory, "robots.txt"), createRobotsTxt({ preview: isPreview }), "utf8");
await writeFile(path.join(publicDirectory, "sitemap.xml"), createSitemapXml(), "utf8");
