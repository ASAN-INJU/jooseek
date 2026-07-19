const express = require("express");

const router = express.Router();

const kis = require("./kis");
const analyzer = require("./analyzer");

// 종목 조회
router.get("/stock/:code", async (req, res) => {

    try {

        const code = req.params.code;

        // 한국투자증권 API에서 데이터 조회
        const stock = await kis.getStock(code);

        // 분석
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

module.exports = router;
