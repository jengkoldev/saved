const Atc = (page) => {
    return new Promise(async (resolve, reject) => {
        
        await page.waitForSelector('.product-bottom-panel__add-to-cart');
        await page.click('.product-bottom-panel__add-to-cart');

        // setup category
        const cat = await page.evaluate(() => {

            return new Promise((res, rej) => {
                var categories;
                let sizeCat;
                let search = setInterval(() => {
                    categories = document.querySelectorAll('._1AG6vA');
                    sizeCat = categories.length;

                    if (sizeCat != 0) {
                        for (var i = 0; i < sizeCat; i++) {
                            if (i == 0) {
                                categories[i].querySelector(':not(.EMBVFN)').click();
                            }
                        }
                        document.querySelector('.stardust-button--block').click();
                        res(true);
                        clearInterval(search);
                    }
                });
            });
        });

        resolve('clicked');
    });
}

module.exports = Atc;