// =======================================
// analyzer.js
// V12 Ultimate 분석 엔진
// =======================================

const indicator = require("./indicator");


function analyze(data) {

    const close = data.close || [];


    // 데이터 부족
    if (close.length < 60) {

        return {

            ma: {
                ma5: 0,
                ma20: 0,
                ma60: 0
            },

            macd: {
                macd: 0,
                signal: 0
            },

            rsi: 0,

            score: 0,

            signal: "데이터 부족",

            target: 0,

            stop: 0

        };

    }


    const ma = indicator.getMA(close);

    const macd = indicator.getMACD(close);

    const rsi = indicator.getRSI(close);


    let score = 0;


    // 5일선 > 20일선
    if (ma.ma5 > ma.ma20) {

        score += 30;

    }


    // 20일선 > 60일선
    if (ma.ma20 > ma.ma60) {

        score += 20;

    }


    // MACD 상승
    if (macd.macd > macd.signal) {

        score += 30;

    }


    // RSI
    if (rsi < 30) {

        score += 20;

    } 
    else if (rsi > 70) {

        score -= 10;

    }



    let signal = "";


    if (score >= 90) {

        signal = "★★★★★ 적극매수";

    }
    else if (score >= 80) {

        signal = "★★★★☆ 매수";

    }
    else if (score >= 70) {

        signal = "★★★☆☆ 관심";

    }
    else if (score >= 60) {

        signal = "★★☆☆☆ 관망";

    }
    else {

        signal = "☆☆☆☆☆ 비추천";

    }



    const current = close[close.length - 1] || 0;


    // 목표가 +5%
    const target = Math.round(current * 1.05);


    // 손절가 -3%
    const stop = Math.round(current * 0.97);



    return {

        ma,

        macd,

        rsi,

        score,

        signal,

        target,

        stop

    };

}



module.exports = {

    analyze

};
