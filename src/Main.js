const puppeteer = require('puppeteer');
const process = require('node:process');

const fs = require("fs");
(async () => {
    if (!fs.existsSync("screenshots")) {
        fs.mkdirSync("screenshots");
    }

    let args = [];
    for (let i = 2; i < process.argv.length; i++) {
        args.push(process.argv[i]);
    }

    console.log(JSON.stringify(args))

    const browser = await puppeteer.default.launch({
        headless: true,
        args
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