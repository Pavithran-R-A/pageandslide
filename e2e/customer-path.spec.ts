import { expect, test } from "@playwright/test";

test("customer can add a service, review it, and receive the configuration-safe channel state", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Present your work/i })).toBeVisible();
  await page.getByRole("button", { name: "Add" }).first().click();
  await page.getByRole("button", { name: /Open cart, 1 items/i }).click();
  await expect(page.getByRole("dialog", { name: /Order/i })).toBeVisible();
  await page.getByRole("button", { name: /Review order/i }).click();
  await page.getByLabel(/^Name/).fill("Arun");
  await page.getByLabel(/^Topic/).fill("Consumer behaviour presentation");
  await page.getByLabel(/^Deadline/).fill("2026-08-29T18:00");
  await page.getByLabel(/Priority/).check();
  await page.getByRole("button", { name: /Review order/i }).click();
  await expect(page.getByRole("heading", { name: /Ready to send/i })).toBeVisible();
  await page.getByRole("button", { name: /Order on WhatsApp/i }).click();
  await expect(page.getByRole("alert")).toContainText("needs configuration");
});
