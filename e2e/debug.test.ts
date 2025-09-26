import { test, expect } from '@playwright/test';

test('debug plain page structure', async ({ page }) => {
  await page.goto('/plain');
  
  // Get the entire page HTML
  const html = await page.content();
  console.log('Page HTML:', html);
  
  // Check what labels exist on the page
  const labels = await page.locator('label').all();
  console.log('Labels found:', labels.length);
  
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const text = await label.textContent();
    const attributes = await label.evaluate((el) => {
      const attrs: Record<string, string> = {};
      for (let attr of el.attributes) {
        attrs[attr.name] = attr.value;
      }
      return attrs;
    });
    console.log(`Label ${i}: text="${text}", attributes=`, attributes);
  }
  
  // Check what selects exist on the page
  const selects = await page.locator('select').all();
  console.log('Selects found:', selects.length);
  
  for (let i = 0; i < selects.length; i++) {
    const select = selects[i];
    const id = await select.getAttribute('id');
    const attributes = await select.evaluate((el) => {
      const attrs: Record<string, string> = {};
      for (let attr of el.attributes) {
        attrs[attr.name] = attr.value;
      }
      return attrs;
    });
    console.log(`Select ${i}: id="${id}", attributes=`, attributes);
  }
});