// ==============================================
// V12 Ultimate API Server
// server/api-server.js
// ==============================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const kis = require("./kis");
const analyzer = require("./analyzer");

const app = express();

app.use(cors());
app.use(express.json());

// ----------------------------------------------
// 서버 상태 확인
// ----------------------------------------------
app.get("/", (req, res) => {

    res.json({
        success: true,
        server: "V12 Ultimate",
        status: "Running",
        time: new Date()
    });

});

// ----------------------------------------------
// 종목 조회
// ----------------------------------------------
app.get("/api/stock/:code", async (req, res) => {

    try {

        const code = req.params.code;

        // 한국투자증권 조회
        const stock = await kis.getStock(code);

        // 기술적 분석
        const analysis = analyzer.analyze({
            close: stock.close
        });

        res.json({

            success: true,

            name: stock.name,

            code: stock.code,

            price: stock.price,

            change: stock.change,

            volume: stock.volume,

            ma5: analysis.ma.ma5,

            ma20: analysis.ma.ma20,

            ma60: analysis.ma.ma60,

            macd: analysis.macd.macd,

            signalLine: analysis.macd.signal,

            rsi: analysis.rsi,

            score: analysis.score,

            signal: analysis.signal

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});

// ----------------------------------------------
// 서버 실행
// ----------------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("");
    console.log("====================================");
    console.log(" V12 Ultimate API Server Started");
    console.log(" PORT : " + PORT);
    console.log("====================================");
    console.log("");

});
