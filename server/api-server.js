require("dotenv").config();

console.log("=== NEW V11.2 SERVER START ===");

const express = require("express");
const cors = require("cors");

const app = express();


// 미들웨어
app.use(cors());
app.use(express.json());


// ================================
// 기본 서버 확인
// ================================
app.get("/", (req, res) => {

    res.send("V11.2 API Server Running");

});


// ================================
// 주식 조회 테스트 API
// ================================
app.get("/api/stock/:code", (req, res) => {

    const code = req.params.code;


    res.json({

        success: true,

        code: code,

        name: "삼성전자",

        price: 85000,

        change: 1.25,

        volume: 12345678,


        // 이동평균
        ma5: 84200,

        ma20: 83000,

        ma60: 79000,


        // AI 분석 점수
        score: 82,

        signal: "매수 관심"

    });

});


// ================================
// 404 처리
// ================================
app.use((req, res) => {

    res.status(404).json({

        success:false,

        message:"API 주소를 확인하세요",

        path:req.originalUrl

    });

});


// ================================
// 서버 실행
// ================================
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {

    console.log(
        `V11.2 Server running on port ${PORT}`
    );

});
