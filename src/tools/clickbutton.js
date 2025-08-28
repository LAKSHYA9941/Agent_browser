import { getPage } from '../browser.js';
import snap from '../snap.js';

export default async (selector) => {
    const p = getPage();
    if (selector.startsWith('text=')) {
        const text = selector.slice(5).trim().toLowerCase();
        const handle = await p.waitForFunction((t) => {
            const candidates = Array.from(document.querySelectorAll('button, [role="button"], input[type="submit"], a'));
            return candidates.find(el => (el.innerText || el.value || '').trim().toLowerCase().includes(t)) || null;
        }, {}, text);
        const el = await handle.asElement();
        if (el) await el.click();
    } else {
        await p.waitForSelector(selector);
        await p.click(selector);
    }
    await snap('clickbutton');
    return `Clicked ${selector}`;
};