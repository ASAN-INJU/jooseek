// =======================================
// indicator.js
// 기술적 분석 지표 계산
// =======================================

// -------------------------------
// 이동평균
// -------------------------------
function average(arr){

    if(arr.length===0) return 0;

    const sum = arr.reduce((a,b)=>a+b,0);

    return sum/arr.length;

}

function getMA(close){

    return{

        ma5:average(close.slice(0,5)),

        ma20:average(close.slice(0,20)),

        ma60:average(close.slice(0,60))

    };

}

// -------------------------------
// EMA
// -------------------------------
function getEMA(data, period){

    const k = 2/(period+1);

    let ema = data[0];

    for(let i=1;i<data.length;i++){

        ema = data[i]*k + ema*(1-k);

    }

    return ema;

}

// -------------------------------
// MACD
// -------------------------------
function getMACD(close){

    const ema12 = getEMA(close,12);

    const ema26 = getEMA(close,26);

    const macd = ema12 - ema26;

    const signal = macd;

    return{

        macd,

        signal

    };

}

// -------------------------------
// RSI
// -------------------------------
function getRSI(close){

    let gain=0;

    let loss=0;

    for(let i=1;i<15;i++){

        const diff=close[i-1]-close[i];

        if(diff>0){

            gain+=diff;

        }else{

            loss+=Math.abs(diff);

        }

    }

    if(loss===0) return 100;

    const rs=gain/loss;

    return Number((100-(100/(1+rs))).toFixed(2));

}

// -------------------------------

module.exports={

    getMA,

    getEMA,

    getMACD,

    getRSI

};
