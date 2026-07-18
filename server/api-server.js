// =====================================
// api-server.js
// =====================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

let accessToken = "";

// 토큰 발급
async function getAccessToken() {
    try {
        const response = await axios.post(
            process.env.KIS_BASE_URL + "/oauth2/tokenP",
            {
                grant_type: "client_credentials",
                appkey: process.env.APP_KEY,
                appsecret: process.env.APP_SECRET
            }
        );

        accessToken = response.data.access_token;
        console.log("토큰 발급 성공");
    } catch (err) {
        console.error("토큰 발급 실패");
        console.error(err.response?.data || err.message);
    }
}

// 서버 시작 시 토큰 발급
getAccessToken();

// 시세 조회 API
app.get("/api/price/:code", async (req, res) => {

    const code = req.params.code;

    try {

        // 여기에 한국투자증권 시세 조회 API 호출

        // 현재는 테스트 데이터
        res.json({
            name: "삼성전자",
            price: 83500,
            change: 1.52,
            open: 83000,
            high: 84200,
            low: 82800,
            volume: 15234567,
            ma5: 82900,
            ma20: 81200,
            ma60: 78500,
            score: 88,
            signal: "매수",
            target: 86500,
            stop: 81800
        });

    } catch (err) {

        res.status(500).json({
            error: "조회 실패"
        });

    }

});

app.listen(PORT, () => {
    console.log("Server Running : " + PORT);
});
