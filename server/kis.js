// ========================================
// kis.js
// 한국투자증권 API
// ========================================

const axios = require("axios");

let accessToken = "";

// 토큰 발급
async function getAccessToken() {

    if (accessToken) {
        return accessToken;
    }

    const response = await axios.post(

        process.env.KIS_BASE_URL + "/oauth2/tokenP",

        {
            grant_type: "client_credentials",
            appkey: process.env.APP_KEY,
            appsecret: process.env.APP_SECRET
        }

    );

    accessToken = response.data.access_token;

    return accessToken;

}

// 현재가 조회
async function getPrice(code) {

    const token = await getAccessToken();

    const response = await axios.get(

        process.env.KIS_BASE_URL +
        "/uapi/domestic-stock/v1/quotations/inquire-price",

        {

            headers: {

                authorization: `Bearer ${token}`,

                appkey: process.env.APP_KEY,

                appsecret: process.env.APP_SECRET,

                tr_id: "FHKST01010100"

            },

            params: {

                FID_COND_MRKT_DIV_CODE: "J",

                FID_INPUT_ISCD: code

            }

        }

    );

    return response.data.output;

}
// ========================================
// 최근 종가 조회 (일봉)
// ========================================

async function getDailyPrices(code) {

    const token = await getAccessToken();

    const response = await axios.get(

        process.env.KIS_BASE_URL +
        "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",

        {

            headers: {

                authorization: `Bearer ${token}`,

                appkey: process.env.APP_KEY,

                appsecret: process.env.APP_SECRET,

                tr_id: "FHKST03010100"

            },

            params: {

                FID_COND_MRKT_DIV_CODE: "J",

                FID_INPUT_ISCD: code,

                FID_PERIOD_DIV_CODE: "D",

                FID_ORG_ADJ_PRC: "1"

            }

        }

    );

    return response.data.output2 || [];

}
module.exports = {

    getPrice

};
