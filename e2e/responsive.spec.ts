import { expect, test } from "@playwright/test";

const viewports = [
  [320, 720], [360, 800], [390, 844], [430, 932], [768, 1024], [1024, 900], [1280, 900], [1440, 1000],
] as const;

test("the editorial catalogue has no horizontal overflow at all required breakpoints", async ({ page }) => {
  for (const [width, height] of viewports) {
    await page.setViewportSize({ width, height });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /College work/i })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
});

test("the fixed mobile cart bar is visible and leaves document space after an item is added", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Add" }).first().click();
  const cartBar = page.getByRole("button", { name: /View order/i });
  await expect(cartBar).toBeVisible();
  expect(await cartBar.evaluate((element) => window.getComputedStyle(element).position)).toBe("fixed");
  expect(await page.evaluate(() => document.body.scrollWidth <= window.innerWidth)).toBe(true);
});
