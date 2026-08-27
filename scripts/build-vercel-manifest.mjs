import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = "/home/ubuntu/softbazzar";
const includeRoots = ["client/src", "client/public"];
const rootFiles = [
  "package.json",
  "pnpm-lock.yaml",
  "patches/wouter@3.7.1.patch",
  "vite.config.ts",
  "tsconfig.json",
  "tsconfig.node.json",
  "components.json",
];

async function collectFiles(relativeDirectory) {
  const entries = await readdir(path.join(root, relativeDirectory), { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const relativePath = path.posix.join(relativeDirectory, entry.name);
    return entry.isDirectory() ? collectFiles(relativePath) : [relativePath];
  }));
  return nested.flat();
}

const sourceFiles = [
  ...rootFiles,
  ...(await Promise.all(includeRoots.map(collectFiles))).flat(),
].sort();

const files = await Promise.all(sourceFiles.map(async (file) => ({
  file,
  data: await readFile(path.join(root, file), "utf8"),
  encoding: "utf-8",
})));

await writeFile(path.join(root, "vercel-deploy-input.json"), JSON.stringify({
  name: "softbazzar",
  teamId: "team_FFtBNFMsQMOc92Oqv2wnrC6Y",
  target: "preview",
  projectSettings: {
    framework: "vite",
    installCommand: "pnpm install --frozen-lockfile",
    buildCommand: "pnpm exec vite build",
    outputDirectory: "dist/public",
  },
  files,
}));
