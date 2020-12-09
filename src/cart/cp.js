const Atc = (page) => {
    return new Promise(async (resolve, reject) => {
        
        // wait price
         const response = await page.evaluate(() => {
            return new Promise((res, rej) => {
                let targetEl;

                let finding = setInterval(() => {
                    targetEl = document.querySelector('.product-carousel__unavailable--sold-out');

                    if (targetEl != null) {
                        res('soldout');
                        clearInterval(finding);
                    }
                }, 100);
            });
        }); // eval

        console.log(response)
        resolve(response);

    });
}

module.exports = Atc;