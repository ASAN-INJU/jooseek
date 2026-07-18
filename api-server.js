// =================================
// api-server.js
// =================================

require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { getPrice } = require("./kis");
const { analyze } = require("./ai");


const app = express();


app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;


// 테스트 주소
app.get("/", (req,res)=>{

    res.send("Stock AI Server Running");

});



// 주가 조회

app.get("/api/price/:code", async(req,res)=>{


    try{


        const code=req.params.code;


        // 한국투자증권 데이터
        const stock =
        await getPrice(code);



        // AI 분석
        const result =
        analyze(stock);



        res.json(result);



    }catch(error){


        console.log(error);


        res.status(500).json({

            error:"주가 조회 실패"

        });


    }


});





app.listen(PORT,()=>{


console.log(
`Server running ${PORT}`
);


});
