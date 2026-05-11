import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage();
await p.goto('http://localhost:3110/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1500);
const data = await p.evaluate(() => {
  const html = document.documentElement;
  const body = document.body;
  const hero = document.querySelector('.hero');
  const section = document.querySelector('.section');
  const title = document.querySelector('.hero-title');
  const get = (el) => el ? window.getComputedStyle(el).backgroundColor : 'NOTFOUND';
  return {
    html: get(html),
    body: get(body),
    hero: get(hero),
    section: get(section),
    title: get(title),
    titleColor: title ? window.getComputedStyle(title).color : 'NOTFOUND',
  };
});
console.log(JSON.stringify(data, null, 2));
await b.close();
