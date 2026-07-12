import { Page, Locator } from '@playwright/test';

export class PosDashboardPage {
  readonly page: Page;
  
  // Locators
  readonly selectStoreButton: Locator;
  readonly posMenuButton: Locator;
  readonly customerButton: Locator;
  readonly registerNewCustomerButton: Locator;
  readonly fullNameInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly submitCustomerButton: Locator;
  readonly closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Setup Locators
    this.selectStoreButton = page.getByRole('button', { name: 'Select Store' }).first();
    this.posMenuButton = page.getByRole('button', { name: 'POS' });
    this.customerButton = page.getByRole('button', { name: 'Customer', exact: true });
    this.registerNewCustomerButton = page.getByRole('button', { name: 'Register New Customer' });
    this.fullNameInput = page.getByRole('textbox', { name: 'Full Name *' });
    this.phoneNumberInput = page.getByRole('textbox', { name: 'Phone Number *' });
    this.submitCustomerButton = page.getByRole('button', { name: 'Register Customer' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  // Actions
  async enterStore() {
    await this.selectStoreButton.click();
  }

  async openPOS() {
    await this.posMenuButton.click();
  }

  async registerCustomer(fullName: string, phone: string) {
    // Handle dialog gracefully if duplicate or other alert pops up
    this.page.once('dialog', dialog => {
      dialog.dismiss().catch(() => {});
    });

    await this.customerButton.click();
    await this.registerNewCustomerButton.click();
    await this.fullNameInput.fill(fullName);
    await this.phoneNumberInput.fill(phone);
    await this.submitCustomerButton.click();
    
    // Close success popup and modal based on user input
    await this.closeButton.first().click();
    // Use try-catch or double click if the second close is needed
    try {
      await this.closeButton.first().click({ timeout: 2000 });
    } catch (e) {}
  }
}
