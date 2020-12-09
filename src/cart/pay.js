const Atc = (page) => {
    return new Promise(async (resolve, reject) => {
        
        // wait price
         const price = await page.evaluate(() => {
            return new Promise((res, rej) => {
                let price;
                let payBtn;

                let finding = setInterval(() => {
                    price = document.querySelector('.page-checkout-total-payment__price');

                    if (price.textContent != 'Rp') {
                        payBtn = document.querySelector('.page-checkout-place-order-section__button');
                        payBtn.click();
                        res(price.textContent);
                        clearInterval(finding);
                    }
                }, 100);
            });
        }); // eval

        console.log(price);
        resolve(true);

    });
}

module.exports = Atc;