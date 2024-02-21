const puppeteer = require('puppeteer');
const fs = require("fs");
(async () => {
    if (!fs.existsSync("screenshots")) {
        fs.mkdirSync("screenshots");
    }
    const browser = await puppeteer.default.launch({
        // headless: true,
        // args: ["--enable-gpu"]
    });
    const page = await browser.newPage();
    await page
        .goto('chrome://gpu', { waitUntil: 'networkidle0' })
        .catch(e => console.log(e));
    await page.setViewport({ width: 1920, height: 1080 });
    await page.screenshot({
        type: "jpeg",
        path: "screenshots/gpu.jpg"
    });
    await browser.close();
})().catch(err => console.error(err));