import { test, expect } from '@playwright/test';

// Define the test cases for different routes
const testCases = [
  { route: '/plain', description: 'Plain HTML Select Component' },
  { route: '/shadcn', description: 'Shadcn Select Component' }
];

for (const { route, description } of testCases) {
  test.describe(`${description} - Fruit Selection`, () => {
    /**
     * Test the select component at the specified route
     */
    test.beforeEach(async ({ page }) => {
      // Navigate to the select component page
      await page.goto(route);
    });

    test('should display the select component with proper structure', async ({ page }) => {
      // Verify the label exists with correct text
      const label = page.locator('label[for="favoriteFruit"]');
      await expect(label).toBeVisible();
      await expect(label).toHaveText('Select your favorite fruit');

      // Verify the select element exists with proper attributes
      const select = page.locator('select#favoriteFruit');
      await expect(select).toBeVisible();
      await expect(select).toHaveAttribute('aria-describedby', 'fruit-description');
      await expect(select).toHaveAttribute('aria-required', 'true');

      // Verify the placeholder option exists
      const placeholderOption = select.locator('option[value=""]');
      await expect(placeholderOption).toHaveText('--Please choose an option--');

      console.log(`✓ ${description} structure verified`);
    });

    test('role is button', async ({page}) => {
      await page.getByRole('button', { name: 'Select a fruit' }).click()
      await page.getByRole('option', { name: 'Apple'}).waitFor()
      await page.getByRole('option', { name: 'Apple'}).click();
    })

    test('should have all expected fruit options', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Verify all expected options exist (placeholder + 5 fruits)
      const options = select.locator('option');
      await expect(options).toHaveCount(6); // placeholder + 5 fruits

      // Verify each option's value and text
      const expectedOptions = [
        { value: '', text: '--Please choose an option--' },
        { value: 'apple', text: 'Apple' },
        { value: 'banana', text: 'Banana' },
        { value: 'blueberry', text: 'Blueberry' },
        { value: 'grapes', text: 'Grapes' },
        { value: 'pineapple', text: 'Pineapple' }
      ];

      for (const expected of expectedOptions) {
        const option = select.locator(`option[value="${expected.value}"]`);
        // Options within select elements are not typically visible, but we can check their properties
        await expect(option).toHaveText(expected.text);
        await expect(option).toHaveAttribute('value', expected.value);
      }

      console.log(`✓ ${description} all fruit options verified`);
    });

    test('should allow selecting different fruits', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Test selecting Apple
      await select.selectOption({ value: 'apple' });
      await expect(select).toHaveValue('apple');
      
      // Test selecting Banana
      await select.selectOption({ value: 'banana' });
      await expect(select).toHaveValue('banana');
      
      // Test selecting Blueberry
      await select.selectOption({ value: 'blueberry' });
      await expect(select).toHaveValue('blueberry');
      
      // Test selecting Grapes
      await select.selectOption({ value: 'grapes' });
      await expect(select).toHaveValue('grapes');
      
      // Test selecting Pineapple
      await select.selectOption({ value: 'pineapple' });
      await expect(select).toHaveValue('pineapple');

      console.log(`✓ ${description} fruit selection functionality verified`);
    });

     test('should work with testid', async ({ page }) => {
      const select = page.getByTestId('selectFruit');

      await select.click();

      await page.getByTestId("select-apple").click()
      
      });



    test('should handle selection by label text', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Test selecting by label text
      await select.selectOption({ label: 'Apple' });
      await expect(select).toHaveValue('apple');
      
      await select.selectOption({ label: 'Banana' });
      await expect(select).toHaveValue('banana');
      
      await select.selectOption({ label: 'Blueberry' });
      await expect(select).toHaveValue('blueberry');
      
      await select.selectOption({ label: 'Grapes' });
      await expect(select).toHaveValue('grapes');
      
      await select.selectOption({ label: 'Pineapple' });
      await expect(select).toHaveValue('pineapple');

      console.log(`✓ ${description} selection by label text verified`);
    });

    test('should maintain selection state after navigation', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Select a fruit
      await select.selectOption({ value: 'apple' });
      await expect(select).toHaveValue('apple');
      
      // Navigate away and back
      await page.goto('/');
      await page.goto(route);
      
      // Selection should be reset (plain HTML selects don't maintain state)
      const refreshedSelect = page.locator('select#favoriteFruit');
      await expect(refreshedSelect).toHaveValue('');

      console.log(`✓ ${description} selection state reset after navigation verified`);
    });

    test('should have proper accessibility attributes', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      const label = page.locator('label[for="favoriteFruit"]');
      
      // Verify ARIA attributes
      await expect(select).toHaveAttribute('aria-describedby', 'fruit-description');
      await expect(select).toHaveAttribute('aria-required', 'true');
      
      // Verify label association
      await expect(label).toHaveAttribute('for', 'favoriteFruit');
      
      // Verify the label text matches the imported value
      await expect(label).toHaveText('Select your favorite fruit');

      console.log(`✓ ${description} accessibility attributes verified`);
    });

    test('should handle empty selection correctly', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Initially should have empty value
      await expect(select).toHaveValue('');
      
      // Select a fruit then reset to empty
      await select.selectOption({ value: 'apple' });
      await expect(select).toHaveValue('apple');
      
      // Reset to empty selection
      await select.selectOption({ value: '' });
      await expect(select).toHaveValue('');

      console.log(`✓ ${description} empty selection handling verified`);
    });

    test('should display correct options order', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      const options = select.locator('option');
      
      // Verify the order of options (matches the fruit.ts array order)
      const expectedOrder = [
        '--Please choose an option--',
        'Apple',
        'Banana',
        'Blueberry',
        'Grapes',
        'Pineapple'
      ];

      for (let i = 0; i < expectedOrder.length; i++) {
        const optionText = await options.nth(i).textContent();
        expect(optionText).toBe(expectedOrder[i]);
      }

      console.log(`✓ ${description} options order verified`);
    });

    test('should be responsive to keyboard interactions', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      
      // Focus the select element by clicking it
      await select.click();
      
      // Verify the select is focused after click
      await expect(select).toBeFocused();
      
      // Test keyboard selection using arrow keys
      await page.keyboard.press('ArrowDown'); // Navigate to first option
      await page.keyboard.press('Enter'); // Select the option
      
      // Verify selection was made (should be Apple, the first non-placeholder option)
      await expect(select).toHaveValue('apple');
      
      console.log(`✓ ${description} basic keyboard interaction verified`);
    });

    test('should integrate with fruit data correctly', async ({ page }) => {
      // Verify the label uses the imported fruitLabelText
      const label = page.locator('label[for="favoriteFruit"]');
      await expect(label).toHaveText('Select your favorite fruit');
      
      // Verify the select uses the imported forValue
      const select = page.locator('select#favoriteFruit');
      await expect(select).toBeVisible();
      
      // Verify all fruits from the imported array are present
      const options = select.locator('option');
      await expect(options).toHaveCount(6); // placeholder + 5 fruits
      
      console.log(`✓ ${description} fruit data integration verified`);
    });

    test('comprehensive workflow test', async ({ page }) => {
      const select = page.locator('select#favoriteFruit');
      const label = page.locator('label[for="favoriteFruit"]');
      
      // Step 1: Verify initial state
      await expect(label).toBeVisible();
      await expect(label).toHaveText('Select your favorite fruit');
      await expect(select).toBeVisible();
      await expect(select).toHaveValue('');
      
      // Step 2: Verify all options are present
      const options = select.locator('option');
      await expect(options).toHaveCount(6);
      
      // Step 3: Select Apple and verify
      await select.selectOption({ value: 'apple' });
      await expect(select).toHaveValue('apple');
      
      // Step 4: Select Banana and verify
      await select.selectOption({ value: 'banana' });
      await expect(select).toHaveValue('banana');
      
      // Step 5: Select Pineapple and verify
      await select.selectOption({ value: 'pineapple' });
      await expect(select).toHaveValue('pineapple');
      
      // Step 6: Reset to empty selection
      await select.selectOption({ value: '' });
      await expect(select).toHaveValue('');
      
      console.log(`✓ ${description} comprehensive workflow completed successfully`);
    });
  });
}