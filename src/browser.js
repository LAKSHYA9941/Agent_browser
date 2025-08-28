import puppeteer from 'puppeteer';

let browser, page;

export async function launch() {
    browser = await puppeteer.launch({
        headless: false,        // set true for CI
        slowMo: 50,             // human-like delay
        defaultViewport: null,
        args: ['--start-maximized']
    });
    page = await browser.newPage();
    return { browser, page };
}

export async function close() {
    await browser?.close();
}

export function getPage() {
    return page;
}