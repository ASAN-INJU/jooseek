// =============================================
// V11.2 한국투자증권 API Server
// Part 1
// 서버 생성 + 환경변수 + Access Token 자동발급
// =============================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

//--------------------------------------
// 환경변수
//--------------------------------------

const APP_KEY = process.env.APP_KEY;
const APP_SECRET = process.env.APP_SECRET;
const BASE_URL = process.env.BASE_URL;

let ACCESS_TOKEN = "";

//--------------------------------------
// Access Token 발급
//--------------------------------------

async function issueAccessToken() {

    try {

        console.log("================================");
        console.log("Access Token 발급중...");
        console.log("================================");

        const response = await axios.post(

            `${BASE_URL}/oauth2/tokenP`,

            {
                grant_type: "client_credentials",
                appkey: APP_KEY,
                appsecret: APP_SECRET
            },

            {
                headers: {
                    "content-type": "application/json"
                }
            }

        );

        ACCESS_TOKEN = response.data.access_token;

        console.log("");
        console.log("✅ Access Token 발급 성공");
        console.log("");

    } catch (err) {

        console.log("");
        console.log("❌ Access Token 발급 실패");
        console.log("");

        if (err.response) {
            console.log(err.response.data);
        } else {
            console.log(err.message);
        }

    }

}

//--------------------------------------
// Token 확인 API
//--------------------------------------

app.get("/token", (req, res) => {

    res.json({

        success: ACCESS_TOKEN !== "",

        token:
            ACCESS_TOKEN === ""
                ? "NOT ISSUED"
                : ACCESS_TOKEN.substring(0, 30) + "..."

    });

});

//--------------------------------------
// 서버 시작
//--------------------------------------

app.listen(PORT, async () => {

    console.log("");
    console.log("================================");
    console.log("V11.2 API SERVER START");
    console.log("PORT :", PORT);
    console.log("================================");

    await issueAccessToken();

});
