import { test, expect } from '@playwright/test';
import { RamooLandingPage } from '../../../src/pages/ramoo-landing.page';

test.describe('Ramoo.id Landing Page @smoke @landing', () => {
    let landingPage: RamooLandingPage;

    test.beforeEach(async ({ page }) => {
        landingPage = new RamooLandingPage(page);
        await landingPage.goto();
    });

    test('should load landing page successfully @ui', async ({ page }) => {
        // Basic performance issue check: waiting for load state
        await page.waitForLoadState('networkidle');
        
        // Ensure title is present (based on actual Ramoo.id title)
        await expect(page).toHaveTitle(/Ramoo - Aplikasi Kasir AI/i);

        // Verify the main hero headline is visible
        const heroHeading = page.locator('h1', { hasText: /Kelola Bisnis F&B dengan/i });
        await expect(heroHeading).toBeVisible();
    });

    test('should have working CTA buttons @ux', async ({ page }) => {
        // Verify the primary CTA button text
        const mainCta = page.locator('a', { hasText: 'Coba RAMOO Gratis Sekarang' }).first();
        await expect(mainCta).toBeVisible();
        await expect(mainCta).toHaveAttribute('href', '/login');
    });

    test('should display key features @content', async ({ page }) => {
        // Verify that main feature highlights exist
        const features = ['Produk & Stok', 'Cash Flow & Akuntansi', 'Customer & CRM', 'POS & Orders'];
        for (const feature of features) {
            await expect(page.locator(`text=${feature}`).first()).toBeVisible();
        }
    });

    test('should not have broken links on main navigation @redirect', async ({ page }) => {
        const navLinks = landingPage.navLinks;
        const count = await navLinks.count();
        
        for(let i=0; i<count; i++) {
            const href = await navLinks.nth(i).getAttribute('href');
            expect(href).not.toBeNull();
            // Validate it's not pointing to empty hash or undefined
            expect(href).not.toBe('#');
        }
    });
});
