import screenshot from 'screenshot-desktop';
import fs from 'fs';
let counter = 0;

export default async function snap(desc = '') {
  counter++;
  const file = `step-${String(counter).padStart(2, '0')}-${desc}.png`;
  await screenshot({ filename: file });
  console.log(`📸  ${file} saved`);
  return file;
}