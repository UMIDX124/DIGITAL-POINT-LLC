import { chromium } from '@playwright/test';
const viewports = [
  {w:1440,h:900,name:'1440'},
  {w:1280,h:800,name:'1280'},
  {w:1024,h:768,name:'1024'},
  {w:768,h:1024,name:'768'},
  {w:375,h:667,name:'375'}
];
const browser = await chromium.launch({headless:true});
for (const v of viewports) {
  const ctx = await browser.newContext({viewport:{width:v.w,height:v.h}});
  const page = await ctx.newPage();
  await page.goto('https://www.digitalpointllc.com/', {waitUntil:'networkidle'});
  await page.waitForTimeout(800);
  await page.screenshot({path:`docs/PHASE_18_5_AUDIT/baseline/viewport-${v.name}.png`, fullPage:true});
  console.log(`Captured ${v.name}px`);
  await ctx.close();
}
await browser.close();
console.log('All 5 viewports captured');
