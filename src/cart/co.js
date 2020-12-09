const Co = (page, cart) => {
    return new Promise(async (resolve, reject) => {

        await page.goto(cart, { waitUntil: 'domcontentloaded' });
        await page.waitForSelector('.stardust-checkbox__input');

        await page.evaluate(() => {
            return new Promise(function (res, rej) {
                let targetName = 'Soul Ultra Wireless Bluetooth Headphone Over Ear Bass'.toLowerCase().replace(/[^a-z]/g, '');
                let productCartNames = document.querySelectorAll('._3OP3bk');
                let productCartNameSizes = productCartNames.length;

                for (let i = 0; i < productCartNameSizes; i++) {
                    if (productCartNames[i].textContent.toLowerCase().replace(/[^a-z]/g, '') == targetName) {
                        let productCart = document.querySelectorAll('._17hSZB')[i]; // product cart
                        let cb = productCart.querySelector('.stardust-checkbox__input');
                        cb.click(); // click the checkbox
                        let cbParent = cb.parentElement;

                        // click the checkout
                        if (cbParent.getAttribute('class').indexOf('stardust-checkbox--checked') > -1) {
                            document.querySelector('.stardust-button--primary').click();
                            res(true);
                        }
                    }
                } // end loop
            });
        }); // eval

        resolve(true);
    });
}

module.exports = Co;