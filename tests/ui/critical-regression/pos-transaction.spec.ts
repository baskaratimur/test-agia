import { test, expect, type Page } from '@playwright/test';
import { PosDashboardPage } from '../../../src/pages/pos/pos-dashboard.page';
import { PosSalesPage } from '../../../src/pages/pos/pos-sales.page';
import { PosPaymentPage } from '../../../src/pages/pos/pos-payment.page';
import { PosOrdersPage } from '../../../src/pages/pos/pos-orders.page';

// Menggunakan .serial agar test dijalankan berurutan (test 2 butuh hasil dari test 1)
test.describe.serial('POS Critical Regression - End to End Transaction', () => {
  let page: Page;
  let dashboardPage: PosDashboardPage;
  let salesPage: PosSalesPage;
  let paymentPage: PosPaymentPage;
  let ordersPage: PosOrdersPage;
  
  // Karena flow saling bergantung, kita gunakan 1 browser page untuk 3 test ini
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext({
      viewport: null,
      storageState: 'playwright/.auth/user.json'
    });
    page = await context.newPage();
    dashboardPage = new PosDashboardPage(page);
    salesPage = new PosSalesPage(page);
    paymentPage = new PosPaymentPage(page);
    ordersPage = new PosOrdersPage(page);
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('1. Buka POS dan Set Customer', async () => {
    // Arahkan ke URL spesifik select-store setelah session termuat
    await page.goto('https://pos.ramoo.id/select-store');
    await expect(dashboardPage.selectStoreButton).toBeVisible({ timeout: 10000 });

    await dashboardPage.enterStore();
    // Assert url dashboard and main role text
    await expect(page).toHaveURL('https://pos.ramoo.id/');
    await expect(page.getByRole('main')).toContainText('Dashboard');
    
    await dashboardPage.openPOS();
    
    const randomCustomerName = 'Customer ' + Math.floor(Math.random() * 10000);
    await dashboardPage.registerCustomer(randomCustomerName, '08997775838');
  });

  test('2. Proses Keranjang dan Lakukan Pembayaran', async () => {
    await salesPage.addProductByIndex(0);
    await salesPage.proceedToPayment();

    const specialRequest = 'ga pake gula';
    const randomTableNumber = Math.floor(Math.random() * (500 - 100 + 1) + 100).toString();
    await paymentPage.setTableNumberAndDetails(randomTableNumber, specialRequest);
    await paymentPage.payWithCash('5000000');
    
    await expect(page.getByRole('heading', { name: 'Payment Successful!' })).toBeVisible();
    await paymentPage.closeSuccessDialog();
  });

  test('3. Proses Order hingga Selesai (Completed)', async () => {
    await ordersPage.openOrdersTab();
    
    await expect(page.getByRole('main')).toContainText('Active');
    await expect(page.getByRole('main')).toContainText('ga pake gula');
    
    await ordersPage.processOrderToReady();
    await expect(page.getByRole('main')).toContainText('Ready', { ignoreCase: true });

    await ordersPage.processOrderToCompleted();
    
    await ordersPage.filterCompletedOrders();
    await expect(page.getByRole('main')).toContainText('completed', { ignoreCase: true });
  });

});
