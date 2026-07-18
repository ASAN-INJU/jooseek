// ========================================
// api-server.js
// ========================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getPrice } = require("./kis");
const { analyze } = require("./ai");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// 서버 확인
app.get("/", (req, res) => {

    res.json({

        server: "Stock AI Server",

        version: "13.0",

        status: "Running"

    });

});

// 현재가 조회
app.get("/api/price/:code", async (req, res) => {

    try {

        const code = req.params.code;

        const stock = await getPrice(code);

        // 임시값
        stock.ma5 = stock.price;
        stock.ma20 = stock.price;
        stock.ma60 = stock.price;
        stock.rsi = 50;

        const result = analyze(stock);

        res.json(result);

    } catch (error) {

        console.log(error);

        res.status(500).json({

            error: "주가 조회 실패"

        });

    }

});

app.listen(PORT, () => {

    console.log("================================");

    console.log(" Stock AI Server Running ");

    console.log(" Port :", PORT);

    console.log("================================");

});
