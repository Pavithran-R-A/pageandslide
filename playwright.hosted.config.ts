import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  testMatch: "hosted-preview.spec.ts",
  timeout: 90_000,
  workers: 1,
  reporter: "list",
  outputDir: "test-results-hosted",
  use: { ...devices["Desktop Chrome"], trace: "retain-on-failure" },
});
