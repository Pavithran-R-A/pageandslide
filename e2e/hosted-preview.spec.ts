import { expect, test } from "@playwright/test";

const hostedUrl = process.env.HOSTED_URL;
const requestedWidths = [320, 360, 390, 430, 768, 1024, 1280, 1440];

test.skip(!hostedUrl, "HOSTED_URL is required for Vercel preview QA.");

test("Vercel preview passes responsive, cart, checkout, accessibility, and safety QA", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const failedResponses: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("response", (response) => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`); });

  await page.goto(hostedUrl!, { waitUntil: "networkidle" });
  await expect(page).toHaveTitle("SoftBazzar | PPT & Report Services for MCC Students");
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /Present your work/i })).toBeVisible();
  await expect(page.getByText("FOR MCC STUDENTS", { exact: true })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("button", { name: /Open cart, 0 items/i })).toBeVisible();
  const searchReadiness = await page.evaluate(async () => {
    const structuredData = document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]');
    const [robots, sitemap] = await Promise.all([fetch("/robots.txt"), fetch("/sitemap.xml")]);
    return {
      canonicalCount: document.querySelectorAll('link[rel="canonical"]').length,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
      ogUrl: document.querySelector('meta[property="og:url"]')?.getAttribute("content"),
      socialImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content"),
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content"),
      structuredData: structuredData?.textContent ? JSON.parse(structuredData.textContent) : null,
      robotsStatus: robots.status,
      robotsText: await robots.text(),
      sitemapStatus: sitemap.status,
      sitemapText: await sitemap.text(),
      pageMarkup: document.documentElement.innerHTML,
    };
  });
  expect(searchReadiness.canonicalCount).toBe(1);
  expect(searchReadiness.canonical).toBe("https://softbazzar.vercel.app/");
  expect(searchReadiness.ogUrl).toBe("https://softbazzar.vercel.app/");
  expect(searchReadiness.socialImage).toBe("https://softbazzar.vercel.app/softbazzar-social.png");
  expect(searchReadiness.twitterCard).toBe("summary_large_image");
  expect(searchReadiness.structuredData).toMatchObject({ "@context": "https://schema.org" });
  expect(searchReadiness.robotsStatus).toBe(200);
  expect(searchReadiness.robotsText).toContain("User-agent: OAI-SearchBot\nAllow: /");
  expect(searchReadiness.sitemapStatus).toBe(200);
  expect(searchReadiness.sitemapText).toContain("<loc>https://softbazzar.vercel.app/</loc>");
  expect(searchReadiness.pageMarkup).not.toContain("softbazzar.example");
  await page.screenshot({ path: testInfo.outputPath("desktop-root.png"), fullPage: true });

  for (const width of requestedWidths) {
    await page.setViewportSize({ width, height: 900 });
    await page.reload({ waitUntil: "networkidle" });
    await expect(page.getByRole("heading", { name: /Present your work/i })).toBeVisible();
    await expect(page.locator(".catalogue-section")).toBeVisible();
    await expect(page.locator(".process-section")).toBeVisible();
    await expect(page.locator(".faq-section")).toBeVisible();
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.reload({ waitUntil: "networkidle" });
  const header = page.locator("header.site-header");
  await page.evaluate(() => window.scrollTo(0, 900));
  expect((await header.boundingBox())?.y).toBeLessThanOrEqual(1);
  await page.evaluate(() => window.scrollTo(0, 0));

  const firstFaq = page.locator(".faq-list details").first();
  await firstFaq.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(firstFaq).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(firstFaq).not.toHaveAttribute("open", "");

  const presentation = page.locator(".service-entry").filter({ has: page.getByRole("heading", { name: "Presentations" }) });
  const report = page.locator(".service-entry").filter({ has: page.getByRole("heading", { name: "Project reports" }) });
  const additionalSlide = presentation.locator(".tier-row").filter({ hasText: "Additional slide" });
  const additionalPage = page.locator(".service-entry").filter({ has: page.getByRole("heading", { name: "Assignment support" }) }).locator(".tier-row").filter({ hasText: "Additional page" });
  await expect(additionalSlide.getByRole("button", { name: "Add" })).toHaveCount(0);
  await expect(additionalPage.getByRole("button", { name: "Add" })).toHaveCount(0);
  await expect(additionalSlide).toContainText("₹15 each");
  await expect(additionalSlide).toContainText("above package");
  await expect(additionalSlide).toContainText("Add-on rate");
  await expect(additionalPage).toContainText("₹8 each");
  await expect(additionalPage).toContainText("above package");
  await expect(additionalPage).toContainText("Add-on rate");
  const presentationTier = presentation.getByRole("button", { name: "Add" }).nth(2);
  const cartToggle = page.getByRole("button", { name: /Open cart/i });

  await presentationTier.click();
  await expect(page.getByRole("button", { name: /Open cart, 1 items/i })).toBeVisible();
  await cartToggle.click();
  const cart = page.getByRole("dialog", { name: "Order" });
  await expect(cart).toBeVisible();
  await expect(cart).toContainText("11–15 slides");
  await expect(cart).toContainText("₹249");
  await expect(cart.locator("article.cart-line")).toHaveCount(1);
  await page.screenshot({ path: testInfo.outputPath("desktop-cart.png"), fullPage: false });
  await page.keyboard.press("Escape");
  await expect(cart).not.toBeVisible();
  await expect(cartToggle).toBeFocused();

  await presentationTier.click();
  await expect(page.getByRole("button", { name: /Open cart, 2 items/i })).toBeVisible();
  await cartToggle.click();
  await expect(cart.locator("article.cart-line")).toHaveCount(1);
  await expect(cart.getByLabel("Quantity 2")).toBeVisible();
  await cart.getByLabel("Decrease quantity of Presentations").click();
  await expect(cart.getByLabel("Quantity 1")).toBeVisible();
  await expect(cart).toContainText("Subtotal₹249");
  await page.keyboard.press("Escape");

  await report.getByRole("button", { name: "Add" }).first().click();
  await expect(page.getByRole("button", { name: /Open cart, 2 items/i })).toBeVisible();
  await cartToggle.click();
  await expect(cart.locator("article.cart-line")).toHaveCount(2);
  await expect(cart).toContainText("Subtotal₹448");
  await cart.getByLabel("Increase quantity of Presentations").click();
  await expect(cart.getByLabel("Quantity 2")).toBeVisible();
  await expect(cart).toContainText("₹498");
  await cart.getByLabel("Decrease quantity of Presentations").click();
  await expect(cart.locator("article.cart-line").filter({ hasText: "Presentations" }).getByLabel("Quantity 1")).toBeVisible();
  await page.keyboard.press("Escape");

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Open cart, 2 items/i })).toBeVisible();
  const storedKeys = await page.evaluate(() => Object.keys(window.localStorage));
  expect(storedKeys).toContain("softbazzar_cart_v1");

  await cartToggle.click();
  await cart.getByRole("button", { name: /Review order/i }).click();
  const details = page.getByRole("dialog", { name: "Order details" });
  await expect(details).toBeVisible();
  await details.getByRole("button", { name: /Review order/i }).click();
  await expect(details.getByText("Enter your name.")).toBeVisible();
  await expect(details.getByText("Describe the topic or requirement.")).toBeVisible();
  await expect(details.getByText("Choose a deadline.")).toBeVisible();
  await expect(details.getByLabel(/^Name/)).toHaveAttribute("maxlength", "80");
  await expect(details.getByLabel(/^Topic/)).toHaveAttribute("maxlength", "200");
  await expect(details.getByLabel(/Additional notes/i)).toHaveAttribute("maxlength", "500");
  await details.getByLabel(/^Name/).fill("Arun");
  await details.getByLabel(/^Topic/).fill("Consumer behaviour presentation");
  const pastDeadline = await page.evaluate(() => {
    const value = new Date(Date.now() - 60_000);
    value.setSeconds(0, 0);
    return new Date(value.getTime() - value.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
  });
  await details.getByLabel(/^Deadline/).fill(pastDeadline);
  await details.getByRole("button", { name: /Review order/i }).click();
  await expect(details.getByText("Choose a deadline in the future.")).toBeVisible();
  await details.getByLabel(/^Deadline/).fill("2026-08-29T18:00");
  await details.getByLabel(/Additional notes/i).fill("x".repeat(501));
  await expect(details.getByText("500/500")).toBeVisible();
  await details.getByLabel(/Priority/).check();
  await details.getByRole("button", { name: /Review order/i }).click();
  const review = page.getByRole("dialog", { name: "Ready to send" });
  await expect(review).toBeVisible();
  const orderReference = await review.locator(".reference-row strong").textContent();
  expect(orderReference).toMatch(/^SB-\d{8}-[A-Z0-9]{4}$/);
  await expect(review).toContainText("Subtotal₹448");
  await expect(review).toContainText("25% delivery surcharge₹112");
  await expect(review).toContainText("Total₹560");
  await page.screenshot({ path: testInfo.outputPath("desktop-order-review.png"), fullPage: false });
  await review.getByRole("button", { name: /Edit details/i }).click();
  await details.getByLabel(/Same day/).check();
  await details.getByRole("button", { name: /Review order/i }).click();
  await expect(review).toContainText("50% delivery surcharge₹224");
  await expect(review).toContainText("Total₹672");
  const sameDayOrderReference = await review.locator(".reference-row strong").textContent();
  expect(sameDayOrderReference).toMatch(/^SB-\d{8}-[A-Z0-9]{4}$/);
  const whatsapp = review.getByRole("link", { name: /Order on WhatsApp/i });
  const telegram = review.getByRole("link", { name: /Order on Telegram/i });
  await expect(whatsapp).toHaveAttribute("href", /^https:\/\/wa\.me\/919025857269\?text=/);
  await expect(telegram).toHaveAttribute("href", /^https:\/\/t\.me\/softbazzar\?text=/);
  await expect(whatsapp).toHaveAttribute("rel", "noopener noreferrer");
  await expect(review.locator(".reference-row strong")).toHaveText(sameDayOrderReference!);
  const checkoutKeys = await page.evaluate(() => Object.keys(window.localStorage));
  expect(checkoutKeys.filter((key) => key !== "softbazzar_cart_v1")).toEqual([]);
  await review.getByLabel("Close order details").click();
  await cartToggle.click();
  await cart.getByRole("button", { name: /Review order/i }).click();
  await expect(details.getByLabel(/^Name/)).toHaveValue("");
  await expect(details.getByLabel(/^Topic/)).toHaveValue("");
  await expect(details.getByLabel(/^Deadline/)).toHaveValue("");
  await expect(details.getByText("0/500")).toBeVisible();
  await details.getByLabel("Close order details").click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload({ waitUntil: "networkidle" });
  const mobileCartBar = page.locator(".mobile-cart-bar");
  await expect(mobileCartBar).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath("mobile-cart-bar.png"), fullPage: false });
  await mobileCartBar.click();
  await expect(cart).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(mobileCartBar).toBeFocused();
  await mobileCartBar.click();
  await expect(cart).toBeVisible();
  await cart.getByRole("button", { name: "Remove" }).first().click();
  await cart.getByRole("button", { name: "Remove" }).first().click();
  await expect(cart).toContainText("Your order is empty.");
  await expect(cart.getByRole("button", { name: /Review order/i })).toHaveCount(0);
  await page.keyboard.press("Escape");
  await page.evaluate(() => window.localStorage.setItem("softbazzar_cart_v1", "{malformed"));
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: /Open cart, 0 items/i })).toBeVisible();
  await expect(page.locator("body")).not.toContainText("NaN");
  await page.screenshot({ path: testInfo.outputPath("mobile-root.png"), fullPage: true });

  const origin = new URL(hostedUrl!).origin;
  await page.goto(`${origin}/404`, { waitUntil: "domcontentloaded", timeout: 15_000 });
  await expect(page.getByRole("heading", { name: "Page Not Found" })).toBeVisible();
  expect(consoleErrors).toEqual([]);
  expect(failedResponses).toEqual([]);
});
