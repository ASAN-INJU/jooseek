// ========================================
// indicator.js
// 기술적 분석 계산
// ========================================

// ================================
// 이동평균선
// ================================
function movingAverage(prices, period) {

    if (prices.length < period) {
        return 0;
    }

    const data = prices.slice(0, period);

    const sum = data.reduce((a, b) => a + b, 0);

    return Number((sum / period).toFixed(2));

}

// ================================
// RSI
// ================================
function calculateRSI(prices, period = 14) {

    if (prices.length <= period) {
        return 50;
    }

    let gain = 0;
    let loss = 0;

    for (let i = 1; i <= period; i++) {

        const diff = prices[i - 1] - prices[i];

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

// ================================
// 최고가
// ================================
function highest(prices, period = 20) {

    return Math.max(...prices.slice(0, period));

}

// ================================
// 최저가
// ================================
function lowest(prices, period = 20) {

    return Math.min(...prices.slice(0, period));

}

// ================================
// 거래량 평균
// ================================
function averageVolume(volumes, period = 20) {

    if (volumes.length < period) return 0;

    const data = volumes.slice(0, period);

    const sum = data.reduce((a, b) => a + b, 0);

    return Math.round(sum / period);

}

// ================================
// 내보내기
// ================================

module.exports = {

    movingAverage,

    calculateRSI,

    calculateEMA,

    calculateMACD,

    highest,

    lowest,

    averageVolume

};
