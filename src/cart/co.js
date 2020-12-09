const Co = (page, cart) => {
    return new Promise(async (resolve, reject) => {

        await page.goto(cart, { waitUntil: 'domcontentloaded' });

        /* with evaluate */
        console.time('wait')
        await page.evaluate(() => {
            return new Promise(function (res, rej) {
                let targetEl;

                let finding = setInterval(function () {
                    targetEl = document.querySelector('.stardust-checkbox__input')

                    if (targetEl != null) {
                        res(true);
                        clearInterval(finding);
                    }
                }, 100);
            });
        });
        console.timeEnd('wait')

        /* testing benchmark */
        // console.time('war')
        // await page.waitForSelector('.stardust-checkbox__input');
        // console.timeEnd('war')

        await page.evaluate(() => {
            return new Promise(function (res, rej) {
                let targetName = 'Nelson Saringan Teh/Kopi 8 Cm - Biru x 2 Pcs'.toLowerCase().replace(/[^a-z]/g, '');
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
                            res(true);
                            document.querySelector('.stardust-button--primary').click();
                        }
                    }
                } // end loop
            });
        }); // eval

        resolve(true);
    });
}

module.exports = Co;