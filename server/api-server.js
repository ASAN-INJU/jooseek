// ==========================================
// V11.2 Ultimate API Server
// ==========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const kis = require("./kis");

const analyzer = require("./analyzer");

const app = express();

app.use(cors());
app.use(express.json());


// 서버 상태 확인
app.get("/", (req, res) => {

    res.json({
        success: true,
        version: "V11.2 Ultimate",
        server: "Running"
    });

});


// 종목 조회
app.get("/api/stock/:code", async (req, res) => {

    try {

        const code = req.params.code;

        // 한국투자증권 API 조회
        const stock = await kis.getStock(code);

        // 기술적 분석
        const analysis = analyzer.analyze({
            close: stock.close || []
        });

        res.json({

            success: true,

            stock,

            analysis

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});


// 서버 시작
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`✅ V11.2 API Server Running : ${PORT}`);

});
