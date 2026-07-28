import { test as base } from '@playwright/test';

export const uiErrorFixtures = base.extend({
    page: async ({ page }, use) => {
        const consoleErrors: string[] = [];

        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(`[Console Error] ${msg.text()}`);
            }
        });

        page.on('response', response => {
            if (response.status() >= 500) {
                console.error(`[Server Error ${response.status()}] ${response.request().method()} ${response.url()}`);
            }
        });

        await use(page);

        if (consoleErrors.length > 0) {
            console.warn(`\n⚠️ [Console Warnings Detected]:\n${consoleErrors.join('\n')}`);
        }
    }
});