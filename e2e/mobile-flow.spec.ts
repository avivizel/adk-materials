import { test, expect } from "@playwright/test";

test.describe("Mobile user flow", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("gambling search → center region → supervised → favorite", async ({ page }) => {
    // 1. Open home
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /למצוא טיפול בהתמכרות/ })).toBeVisible();

    // 2. Choose gambling
    await page.getByRole("link", { name: "הימורים" }).click();
    await expect(page).toHaveURL(/addiction=gambling/);

    // 3. Wait for results
    await expect(page.getByText(/\d+ תוצאות/)).toBeVisible({ timeout: 10000 });

    // 4. Open filter and select center region
    await page.getByRole("button", { name: /סינון תוצאות/ }).click();
    await page.getByRole("button", { name: "תל אביב והמרכז" }).click();
    await page.getByRole("button", { name: "הצג תוצאות" }).click();

    // 5. Verify results exist
    const cards = page.locator("article");
    await expect(cards.first()).toBeVisible({ timeout: 10000 });

    // 6. Open institution details
    await cards.first().getByRole("link", { name: "פרטים" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // 7. Save favorite on detail page
    await page.getByRole("button", { name: "☆ שמור" }).click();

    // 8. Go to favorites
    await page.goto("/favorites");
    await expect(page.getByRole("heading", { name: "המענים ששמרתי" })).toBeVisible();

    // 9. Verify saved institution
    await expect(page.locator("article").first()).toBeVisible({ timeout: 10000 });
  });

  test("home page has emergency banner", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("מצב חירום רפואי או סכנה מיידית?")).toBeVisible();
    await expect(page.getByRole("link", { name: /101 מד״א/ })).toBeVisible();
  });

  test("search page loads", async ({ page }) => {
    await page.goto("/search");
    await expect(page.getByRole("heading", { name: "חיפוש מענים" })).toBeVisible();
    await expect(page.getByLabel("חיפוש שירותים")).toBeVisible();
  });

  test("about page has disclaimer", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "מידע ואודות" })).toBeVisible();
    await expect(page.getByText("מדיניות מידע")).toBeVisible();
  });
});
