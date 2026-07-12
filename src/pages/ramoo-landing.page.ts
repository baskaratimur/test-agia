import { Page, Locator } from '@playwright/test';

export class RamooLandingPage {
    readonly page: Page;
    readonly navLinks: Locator;

    constructor(page: Page) {
        this.page = page;
        // Lokator untuk link navigasi di header
        this.navLinks = page.locator('header nav a');
    }

    async goto() {
        await this.page.goto('/');
    }
}
