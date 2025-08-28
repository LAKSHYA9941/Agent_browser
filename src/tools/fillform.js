import { getPage } from '../browser.js';
import snap from '../snap.js';

export default async ({ selector, value }) => {
    const p = getPage();
    await p.waitForSelector(selector);
    // Clear existing value before typing
    await p.$eval(selector, (el) => { if (el && 'value' in el) el.value = ''; });
    await p.type(selector, value, { delay: 50 });
    await snap('fillform');
    return `Typed "${value}" into ${selector}`;
};