const Atc = (page) => {
    return new Promise(async (resolve, reject) => {
        
        // wait price
         const response = await page.evaluate(() => {
            return new Promise((res, rej) => {
                let targetEl;
                let soonEl;
                let paramEl;

                let finding = setInterval(() => {
                    paramEl = document.querySelector('.product-bottom-panel__chat-now');

                    if (paramEl != null) {
                        targetEl = document.querySelector('.product-carousel__unavailable--sold-out');
                        soonEl = document.querySelector('.product-bottom-panel__coming-soon-bar');
                        
                        if (targetEl != null) {
                            res('soldout');
                            clearInterval(finding);
                        } else if (soonEl != null) {
                            res('soon');
                            clearInterval(finding);
                        } else {
                            res('ready');
                            clearInterval(finding);
                        }
                    }
                }, 100);
            });
        }); // eval

        console.log(response)
        resolve(response);

    });
}

module.exports = Atc;