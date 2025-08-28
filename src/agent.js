import { launch, close, getPage } from './browser.js';
import openpage from './tools/openpage.js';
import findform from './tools/findform.js';
import fillform from './tools/fillform.js';
import clickbutton from './tools/clickbutton.js';

async function run() {
    try {
        await launch();
        await openpage('https://ui.chaicode.com/auth-sada/signup');
        const p = getPage();
        await p.waitForSelector('form, input[type="email"], input[type="text"], input[type="password"], button[type="submit"]', { timeout: 20000 });

        const form = await findform();
        if (!form) throw new Error('No form detected');

        const { nameSelector, emailSelector, passwordSelector, submitSelector } = form;

        if (nameSelector) {
            await fillform({ selector: nameSelector, value: 'Demo User' });
        }
        if (emailSelector) {
            await fillform({ selector: emailSelector, value: 'demo@chaicode.com' });
        }
        if (passwordSelector) {
            await fillform({ selector: passwordSelector, value: 'demo123' });
        }
        if (submitSelector) {
            await clickbutton(submitSelector);
        } else {
            // Fallback: press Enter to submit
            await p.keyboard.press('Enter');
        }

        // Final screenshot of filled form
        await snap('filled-form');

        console.log('task complete');
    } finally {
        await close();
    }
}

export default run;