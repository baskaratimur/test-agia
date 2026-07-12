import { Page, Locator } from '@playwright/test';

export class PosOrdersPage {
  readonly page: Page;

  // Locators
  readonly ordersTabButton: Locator;
  readonly checkItemsButton: Locator;
  readonly readyButton: Locator;
  readonly markOrderAsReadyButton: Locator;
  readonly completeButton: Locator;
  readonly completedFilterButton: Locator;
  
  constructor(page: Page) {
    this.page = page;

    // Setup Locators
    this.ordersTabButton = page.getByRole('button', { name: 'Orders' });
    this.checkItemsButton = page.getByText('Check Items');
    this.readyButton = page.getByRole('button', { name: 'Ready', exact: true }).first();
    this.markOrderAsReadyButton = page.getByRole('button', { name: 'Mark Order as Ready' });
    this.completeButton = page.getByRole('button', { name: 'Complete' });
    this.completedFilterButton = page.getByRole('button', { name: 'Completed' });
  }

  // Actions
  async openOrdersTab() {
    await this.ordersTabButton.click();
  }

  async processOrderToReady() {
    await this.checkItemsButton.click();
    await this.readyButton.click();
    await this.markOrderAsReadyButton.click();
  }

  async processOrderToCompleted() {
    // using nth(1) or first based on rawlocator layout
    await this.completeButton.first().click();
  }
  
  async filterCompletedOrders() {
    await this.completedFilterButton.click();
  }

  // Locators returned for assertions in spec
  getMainContainer(): Locator {
    return this.page.getByRole('main');
  }
}
