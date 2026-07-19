require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


// 서버 확인
app.get("/", (req,res)=>{
    res.send("V11.2 API Server Running");
});


// 주식 테스트
app.get("/api/stock/:code",(req,res)=>{

    res.json({
        success:true,
        code:req.params.code,
        name:"삼성전자",
        price:85000,
        score:82,
        signal:"매수 관심"
    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("V11.2 NEW SERVER START");
    console.log("PORT:",PORT);
});
