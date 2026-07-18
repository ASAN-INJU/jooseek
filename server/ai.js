// ========================================
// ai.js
// AI 점수 계산
// ========================================

function analyze(stock) {

    let score = 50;
    let reasons = [];

    // 전일 대비 상승
    if (stock.change > 0) {
        score += 10;
        reasons.push("전일 대비 상승");
    } else {
        score -= 5;
        reasons.push("전일 대비 하락");
    }

    // 거래량
    if (stock.volume > 1000000) {
        score += 15;
        reasons.push("거래량 활발");
    }

    // 이동평균선
    if (stock.price > stock.ma5) {
        score += 10;
        reasons.push("5일선 위");
    }

    if (stock.ma5 > stock.ma20) {
        score += 10;
        reasons.push("5일선 > 20일선");
    }

    if (stock.ma20 > stock.ma60) {
        score += 15;
        reasons.push("20일선 > 60일선");
    }

    // RSI
    if (stock.rsi >= 40 && stock.rsi <= 70) {
        score += 15;
        reasons.push("RSI 양호");
    }

    // 점수 범위 제한
    if (score > 100) score = 100;
    if (score < 0) score = 0;

    // 매매 신호
    let signal = "";

    if (score >= 90) {
        signal = "★★★★★ 적극매수";
    } else if (score >= 80) {
        signal = "★★★★☆ 매수";
    } else if (score >= 70) {
        signal = "★★★☆☆ 관심";
    } else if (score >= 60) {
        signal = "★★☆☆☆ 관망";
    } else {
        signal = "☆☆☆☆☆ 비추천";
    }

    return {

        ...stock,

        score,

        signal,

        reasons

    };

}

module.exports = {

    analyze

};
