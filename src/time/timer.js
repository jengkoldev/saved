var moment = require('moment-timezone');

const timer = (time) => {

    return new Promise((res, rej) => {
        let getWaktu = setInterval(() => {
            if (moment().tz("Asia/Jakarta").format('mm:ss') == time) {
                res('starting order');
                clearInterval(getWaktu);
            } else {
                // console.log(moment().tz("Asia/Jakarta").format('mm:ss'))
            }
        }, 500);
    });
}

module.exports = timer;