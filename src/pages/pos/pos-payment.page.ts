import { Page, Locator } from '@playwright/test';

export class PosPaymentPage {
  readonly page: Page;

  // Locators
  readonly tableNumberInput: Locator;
  readonly assignTableButton: Locator;
  readonly specialRequestsInput: Locator;
  readonly cashPaymentMethod: Locator;
  readonly payButton: Locator;
  readonly cashReceivedInput: Locator;
  readonly confirmPaymentButton: Locator;
  readonly closeDialogButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Setup Locators
    this.tableNumberInput = page.getByRole('spinbutton', { name: 'Table Number *' });
    this.assignTableButton = page.getByRole('button', { name: 'Assign Table' });
    this.specialRequestsInput = page.getByRole('textbox', { name: 'Any special requests, dietary' });
    this.cashPaymentMethod = page.getByRole('heading', { name: 'Cash' });
    this.payButton = page.getByRole('button', { name: 'Pay Rp' });
    this.cashReceivedInput = page.getByRole('spinbutton', { name: 'Cash Received' });
    this.confirmPaymentButton = page.getByRole('button', { name: 'Confirm Payment' });
    // Assuming the success dialog has a "Close" button
    this.closeDialogButton = page.getByRole('button', { name: 'Close' }).first();
  }

  // Actions
  async setTableNumberAndDetails(tableNumber: string, specialRequest: string) {
    await this.tableNumberInput.fill(tableNumber);
    
    // Select dropdowns by index (1) instead of hardcoding text
    await this.page.getByLabel('Source of Information (').selectOption({ index: 1 });
    await this.page.getByLabel('Occupation (Optional)').selectOption({ index: 1 });
    
    await this.assignTableButton.click();
    await this.specialRequestsInput.fill(specialRequest);
  }

  async payWithCash(amount: string) {
    await this.cashPaymentMethod.click();
    await this.payButton.click();
    await this.cashReceivedInput.fill(amount);
    await this.confirmPaymentButton.click();
  }

  async closeSuccessDialog() {
    await this.closeDialogButton.click();
  }
}
