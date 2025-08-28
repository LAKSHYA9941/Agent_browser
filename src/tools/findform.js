import { getPage } from '../browser.js';
import snap from '../snap.js';

export default async () => {
    const p = getPage();
    const form = await p.waitForSelector('form', { timeout: 20000 });

    const result = await form.evaluate((formEl) => {
        const buildSelector = (el) => {
            if (el.id) return `#${el.id}`;
            if (el.name) return `[name="${el.name}"]`;
            if (el.placeholder) return `${el.tagName.toLowerCase()}[placeholder="${el.placeholder}"]`;
            return null;
        };

        const match = (el) => {
            const text = `${el.name} ${el.id} ${el.placeholder} ${el.ariaLabel || ''} ${(el.labels && Array.from(el.labels).map(l=>l.textContent).join(' ')) || ''} ${el.outerHTML}`.toLowerCase();
            const type = (el.getAttribute('type') || '').toLowerCase();
            const isEmail = type === 'email' || /email/.test(text);
            const isPassword = type === 'password' || /pass(word)?/.test(text);
            const isFullName = /full\s*name/.test(text) || (/name/.test(text) && !/user\s*name|username/.test(text) && type !== 'password' && !isEmail);
            return { isEmail, isPassword, isFullName };
        };

        const inputs = Array.from(formEl.querySelectorAll('input, textarea'));
        let nameSelector = null;
        let emailSelector = null;
        let passwordSelector = null;
        let submitSelector = null;

        for (const el of inputs) {
            const { isEmail, isPassword, isFullName } = match(el);
            if (isFullName && !nameSelector) nameSelector = buildSelector(el);
            if (isEmail && !emailSelector) emailSelector = buildSelector(el);
            if (isPassword && !passwordSelector) passwordSelector = buildSelector(el);
        }

        // Prefer button with text matching "create account" if present
        const buttons = Array.from(formEl.querySelectorAll('button, input[type="submit"], [role="button"]'));
        const targetButton = buttons.find(b => ((b.innerText || b.value || '').trim().toLowerCase().includes('create account')))
            || buttons.find(b => ((b.innerText || b.value || '').trim().toLowerCase().includes('sign up')))
            || buttons[0];

        if (targetButton) {
            submitSelector = targetButton.id ? `#${targetButton.id}` : (targetButton.name ? `[name="${targetButton.name}"]` : `text=${(targetButton.innerText || targetButton.value || 'submit').trim()}`);
        }

        return { nameSelector, emailSelector, passwordSelector, submitSelector };
    });

    await snap('findform');
    console.log('Form selectors', result);
    return result;
};