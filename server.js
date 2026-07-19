// =======================================
// V11.2 Stock Analysis API Server
// =======================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("V11.2 API Server Running");
});

app.get("/api/stock/:code", (req,res)=>{

    const code = req.params.code;

    res.json({
        code: code,
        name:"삼성전자",
        price:85000,
        change:1.25,
        volume:12345678,
        ma5:84200,
        ma20:83000,
        ma60:79000,
        score:82,
        signal:"매수 관심"
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(
        `V11.2 Server running on port ${PORT}`
    );
});
