// ========================================
// kis.js
// 한국투자증권 API 연결
// ========================================

const axios = require("axios");

let accessToken = "";


// ========================================
// 접근 토큰 발급
// ========================================

async function getAccessToken(){

    if(accessToken){

        return accessToken;

    }


    try{


        const response = await axios.post(

            process.env.KIS_BASE_URL +
            "/oauth2/tokenP",

            {

                grant_type:"client_credentials",

                appkey:
                process.env.APP_KEY,

                appsecret:
                process.env.APP_SECRET

            }

        );


        accessToken =
        response.data.access_token;


        console.log(
            "✅ KIS 토큰 발급 성공"
        );


        return accessToken;


    }

    catch(error){


        console.log(
            "❌ 토큰 발급 실패"
        );


        console.log(
            error.response?.data ||
            error.message
        );


        throw error;


    }


}




// ========================================
// 현재가 조회
// ========================================

async function getPrice(code){


    const token =
    await getAccessToken();



    const response =
    await axios.get(


        process.env.KIS_BASE_URL +

        "/uapi/domestic-stock/v1/quotations/inquire-price",


        {


            headers:{


                authorization:
                "Bearer " + token,


                appkey:
                process.env.APP_KEY,


                appsecret:
                process.env.APP_SECRET,


                tr_id:
                "FHKST01010100"


            },


            params:{


                FID_COND_MRKT_DIV_CODE:
                "J",


                FID_INPUT_ISCD:
                code


            }


        }


    );


    return response.data.output;


}





// ========================================
// 일봉 조회
// ========================================

async function getDailyPrices(code){


    const token =
    await getAccessToken();



    const response =
    await axios.get(


        process.env.KIS_BASE_URL +

        "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",


        {


            headers:{


                authorization:
                "Bearer " + token,


                appkey:
                process.env.APP_KEY,


                appsecret:
                process.env.APP_SECRET,


                tr_id:
                "FHKST03010100"


            },


            params:{


                FID_COND_MRKT_DIV_CODE:
                "J",


                FID_INPUT_ISCD:
                code,


                FID_PERIOD_DIV_CODE:
                "D",


                FID_ORG_ADJ_PRC:
                "1"


            }


        }


    );


    return response.data.output2 || [];


}





// ========================================
// 종합 종목 조회
// ========================================

async function getStock(code){


    const price =
    await getPrice(code);



    const daily =
    await getDailyPrices(code);



    const close =

    daily

    .map(item =>

        Number(item.stck_clpr)

    )

    .filter(v => !isNaN(v));




    return {


        code,


        name:
        price.hts_kor_isnm || "",


        price:
        Number(price.stck_prpr || 0),


        change:
        Number(price.prdy_ctrt || 0),


        open:
        Number(price.stck_oprc || 0),


        high:
        Number(price.stck_hgpr || 0),


        low:
        Number(price.stck_lwpr || 0),


        volume:
        Number(price.acml_vol || 0),


        close


    };


}





// ========================================
// 외부 사용
// ========================================

module.exports = {


    getAccessToken,

    getPrice,

    getDailyPrices,

    getStock


};
