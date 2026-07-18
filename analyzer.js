const indicator = require("./indicator");

function analyze(data) {

    const result = {};

    result.ma = indicator.getMA(data.close);
    result.macd = indicator.getMACD(data.close);
    result.rsi = indicator.getRSI(data.close);

    let score = 0;

    // 이동평균
    if (result.ma.ma5 > result.ma.ma20)
        score += 30;

    if (result.ma.ma20 > result.ma.ma60)
        score += 20;

    // MACD
    if (result.macd.macd > result.macd.signal)
        score += 30;

    // RSI
    if (result.rsi < 30)
        score += 20;

    result.score = score;

    if (score >= 80)
        result.signal = "★★★★★ 강력매수";

    else if (score >= 60)
        result.signal = "★★★★ 매수";

    else if (score >= 40)
        result.signal = "★★★ 관망";

    else
        result.signal = "★ 매도주의";

    return result;
}

module.exports = {
    analyze
};
