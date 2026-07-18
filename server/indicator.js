// ========================================
// indicator.js
// 기술적 지표 계산
// ========================================

// 이동평균선
function movingAverage(prices, period) {

    if (!prices || prices.length < period) {
        return 0;
    }

    const slice = prices.slice(-period);

    const sum = slice.reduce((a, b) => a + b, 0);

    return Math.round(sum / period);

}

// RSI 계산
function calculateRSI(prices, period = 14) {

    if (!prices || prices.length <= period) {
        return 50;
    }

    let gain = 0;
    let loss = 0;

    for (let i = prices.length - period; i < prices.length; i++) {

        const diff = prices[i] - prices[i - 1];

        if (diff > 0) {
            gain += diff;
        } else {
            loss += Math.abs(diff);
        }

    }

    if (loss === 0) return 100;

    const rs = gain / loss;

    return Number((100 - (100 / (1 + rs))).toFixed(2));

}

module.exports = {

    movingAverage,

    calculateRSI

};
