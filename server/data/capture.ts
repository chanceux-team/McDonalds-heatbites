import puppeteer from 'puppeteer';

export async function capture() {
  const config = useRuntimeConfig();
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto(config.baseUrl);
  await page.screenshot();
  const element = await page.$('.heatmap');
  if (element) {
    const data = await element.screenshot();
    await browser.close();
    return { file: data };
  } else {
    return { message: 'Element not found' };
  }
}
