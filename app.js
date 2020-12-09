const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());
const config = require('./src/config/browser');
const target = require('./src/config/target');

// time
const Timer = require('./src/time/timer');

// cart
const Atc = require('./src/cart/atc');
const Co = require('./src/cart/co');
const Pay = require('./src/cart/pay');
const CheckProduct = require('./src/cart/cp');

const App = async () => {
    const browser = await puppeteer.launch(config);
    browser.on('targetcreated', async function f() {
        let pages = await browser.pages();
        if (pages.length > 1) {
            await pages[0].close();
            browser.off('targetcreated', f);
        }
    });

    /*
     * pages
     */
    const productP = await browser.newPage();
    const cartP = await browser.newPage();

    await productP.goto(target.link, { waitUntil: 'domcontentloaded' }); // goto product
    await cartP.goto(target.cart, { waitUntil: 'domcontentloaded' }); // goto cart

    // timer
    await Timer('41:19');

    // reload the page
    console.time('reload')
    await productP.goto(target.link, { waitUntil: 'domcontentloaded' });    
    console.timeEnd('reload')

    console.time('detect')
    let res = await CheckProduct(productP); // checking product
    console.timeEnd('detect')

    // reload if not ready flash sale
    if (res == 'soldout' || res == 'soon') {
        console.time('reload')
        await productP.goto(target.link, { waitUntil: 'domcontentloaded' });    
        console.timeEnd('reload')

        res = await CheckProduct(productP);
    }

    if (res == 'soldout' || res == 'soon') {
        console.time('reload')
        await productP.goto(target.link, { waitUntil: 'domcontentloaded' });    
        console.timeEnd('reload')

        res = await CheckProduct(productP);
    }

    if (res == 'soldout' || res == 'soon') {
        await browser.close();
        return;
    }

    console.log(res)

    /**
     * Cart
     */
    console.time('atc')
    await Atc(productP); // add to cart
    console.timeEnd('atc')

    console.time('co')
    await Co(cartP, target.cart); // checkout
    console.timeEnd('co')

    console.time('pay')
    await Pay(cartP);
    console.timeEnd('pay')
}

App();

