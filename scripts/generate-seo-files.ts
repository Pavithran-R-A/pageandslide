import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createRobotsTxt, createSitemapXml } from "../client/src/config/site";

const publicDirectory = resolve(import.meta.dirname, "..", "client", "public");

await mkdir(publicDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDirectory, "robots.txt"), createRobotsTxt()),
  writeFile(resolve(publicDirectory, "sitemap.xml"), createSitemapXml()),
]);
