const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

// Keep third-party analytics, comments, fonts and player content out of deterministic checks.
test.beforeEach(async ({ page, baseURL }) => {
  await page.route('**/*', route => {
    if (new URL(route.request().url()).origin === new URL(baseURL).origin) return route.continue();
    return route.fulfill({ status: 200, body: '' });
  });
});

for (const path of ['/', '/about/', '/projects/', '/contact/', '/blog/', '/php/00/01/', '/2025/05/26/uv-ruff-ty', '/blog/categories/development/', '/404.html']) {
  test(`accessibility and layout: ${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(path);
    expect(response.status()).toBe(200);
    await expect(page.locator('main')).toHaveCount(1);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(results.violations.map(violation => ({
      id: violation.id,
      nodes: violation.nodes.map(node => ({ target: node.target, reason: node.failureSummary })),
    }))).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await expect(page.locator('meta[name="author"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('meta[property="twitter:image"]')).toHaveCount(1);
  });
}

test('keyboard skip link moves focus to main content', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});

test('navigation works with the updated frontend libraries', async ({ page }) => {
  await page.goto('/');
  expect(await page.evaluate(() => jQuery.fn.jquery)).toBe('3.7.1');
  expect(await page.evaluate(() => jQuery.fn.collapse.Constructor.VERSION)).toBe('3.4.1');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  if (await toggle.isVisible()) {
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('.navbar-collapse')).toHaveClass(/\bin\b/);
    const results = await new AxeBuilder({ page }).include('nav').withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(results.violations.map(violation => violation.id)).toEqual([]);
  }
  await page.getByRole('navigation').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL(/\/about\/?$/);
});

test('video maintains its aspect ratio and fits its column', async ({ page }) => {
  await page.goto('/php/00/01/');
  const frame = page.locator('.embed-responsive iframe');
  await expect(frame).toBeVisible();
  const bounds = await frame.boundingBox();
  expect(bounds.width / bounds.height).toBeCloseTo(16 / 9, 1);
  expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
});
