import { Page, Locator } from '@playwright/test';

export class PosSalesPage {
  readonly page: Page;

  // Locators
  // Using a generic locator for products so we can select by index dynamically
  readonly productCards: Locator;
  readonly proceedToPaymentButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Setup Locators
    // Target the product grid container from Radix UI tabs
    this.productCards = page.locator("div[id$='-content-all'] > div > div"); 
    this.proceedToPaymentButton = page.getByRole('button', { name: 'Proceed to Payment' });
  }

  // Actions
  async addProductByIndex(index: number = 0) {
    // Select product by index dynamically instead of hardcoding text
    await this.productCards.nth(index).click();
  }

  async proceedToPayment() {
    await this.proceedToPaymentButton.click();
  }
}
