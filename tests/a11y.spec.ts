import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/pricing', '/audit', '/contact', '/faq'];

for (const path of PAGES) {
  test(`a11y: ${path} has no serious/critical axe violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    const blocking = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical',
    );
    if (blocking.length) {
      console.log('Axe blocking violations on', path, JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });
}
