const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


let accessToken = "";


// ===============================
// 한국투자증권 토큰 발급
// ===============================

async function getToken(){

    const url =
    "https://openapi.koreainvestment.com:9443/oauth2/tokenP";


    const response = await axios.post(
        url,
        {
            grant_type:"client_credentials",
            appkey:process.env.APP_KEY,
            appsecret:process.env.APP_SECRET
        }
    );


    accessToken =
    response.data.access_token;


    console.log("토큰 발급 성공");

    return accessToken;
}



// ===============================
// 이동평균 계산
// ===============================

function average(arr){

    if(arr.length===0)
        return 0;


    const sum =
    arr.reduce((a,b)=>a+b,0);


    return Math.round(sum / arr.length);

}



// ===============================
// 현재가 + 이동평균 조회
// ===============================

app.get("/price", async(req,res)=>{


try{


    const code=req.query.code;


    if(!accessToken){
        await getToken();
    }



    // ----------------------------
    // 현재가
    // ----------------------------

    const priceResponse =
    await axios.get(

    "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price",

    {

    headers:{

    authorization:
    "Bearer "+accessToken,

    appkey:
    process.env.APP_KEY,

    appsecret:
    process.env.APP_SECRET,

    tr_id:"FHKST01010100"

    },


    params:{

    FID_COND_MRKT_DIV_CODE:"J",

    FID_INPUT_ISCD:code

    }

    });


    const priceData =
    priceResponse.data.output;




    // ----------------------------
    // 일봉 데이터 100일
    // ----------------------------

    const dailyResponse =
    await axios.get(

"https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",

{

headers:{

authorization:
"Bearer "+accessToken,

appkey:
process.env.APP_KEY,

appsecret:
process.env.APP_SECRET,

tr_id:"FHKST03010100"

},


params:{

FID_COND_MRKT_DIV_CODE:"J",

FID_INPUT_ISCD:code,

FID_INPUT_DATE_1:"20260101",

FID_INPUT_DATE_2:"20260717",

FID_PERIOD_DIV_CODE:"D",

FID_ORG_ADJ_PRC:"0"

}

});


const candles =
dailyResponse.data.output2 ||
dailyResponse.data.output ||
[];

console.log(
"일봉 데이터 개수:",
candles.length
);


// 최근 종가 배열

const closes =
candles.map(
item=>Number(item.stck_clpr)
);



// 이동평균

const ma5 =
average(closes.slice(0,5));


const ma20 =
average(closes.slice(0,20));


const ma60 =
average(closes.slice(0,60));





res.json({

name:
priceData.hts_kor_isnm,


price:
Number(priceData.stck_prpr),


change:
priceData.prdy_ctrt,


volume:
Number(priceData.acml_vol),


ma5,
ma20,
ma60


});



}catch(error){


console.log(
error.response?.data || error.message
);


res.status(500).json({

error:"주가 조회 실패"

});


}



});





app.listen(PORT,()=>{

console.log(
"V11.2 API 서버 실행 : "+PORT
);

});
