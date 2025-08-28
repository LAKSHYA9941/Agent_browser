import { getPage } from '../browser.js';
import snap from '../snap.js';

export default async (url) => {
    const p = getPage();
    await p.goto(url, { waitUntil: 'networkidle2' });
    await snap('openpage');
    return `Opened ${url}. Title: ${await p.title()}`;
};