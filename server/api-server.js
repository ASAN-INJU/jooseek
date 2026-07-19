// =======================================
// V11.2 Stock Analysis API Server
// =======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// 서버 확인
app.get("/", (req, res) => {

    res.send("V11.2 API Server Running");

});


// =======================================
// 주식 조회 API
// =======================================

app.get("/api/stock/:code", async (req, res) => {

    const code = req.params.code;


    try {

        // 현재는 테스트 데이터
        // 다음 단계에서 한국투자증권 API 연결

        const stock = {

            code: code,

            name: "삼성전자",

            price: 85000,

            change: 1.25,

            volume: 12345678,


            // 이동평균선 테스트
            ma5: 84200,

            ma20: 83000,

            ma60: 79000,


            // 단타 분석 점수
            score: 82,

            signal: "매수 관심"

        };


        res.json(stock);


    } catch(error) {


        res.status(500).json({

            error:"주가 조회 실패"

        });


    }


});


// =======================================
// 서버 시작
// =======================================

const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

    console.log(
        `V11.2 Server running on port ${PORT}`
    );

});
