// =======================================
// V11.2 주식 단타 분석
// api-server.js
// 한국투자증권 OpenAPI 서버
// =======================================


const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();


const app = express();


app.use(cors());
app.use(express.json());



let ACCESS_TOKEN = "";


// =======================================
// 접근 토큰 발급
// =======================================

async function getToken(){


    try{


        const response =
        await axios.post(
        "https://openapi.koreainvestment.com:9443/oauth2/tokenP",
        {

            grant_type:"client_credentials",

            appkey:
            process.env.APP_KEY,

            appsecret:
            process.env.APP_SECRET

        },

        {

            headers:{
                "content-type":
                "application/json"
            }

        });



        ACCESS_TOKEN =
        response.data.access_token;


        console.log("토큰 발급 완료");


    }


    catch(error){

        console.log(
        "토큰 발급 실패",
        error.response?.data
        );

    }


}



// =======================================
// 현재가 조회
// =======================================

app.get("/price", async(req,res)=>{


    const code =
    req.query.code;



    try{


        if(!ACCESS_TOKEN){

            await getToken();

        }



        const result =
        await axios.get(

        "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price",

        {

        params:{

            FID_COND_MRKT_DIV_CODE:"J",

            FID_INPUT_ISCD:code

        },


        headers:{


            "authorization":
            "Bearer "+ACCESS_TOKEN,


            "appkey":
            process.env.APP_KEY,


            "appsecret":
            process.env.APP_SECRET,


            "tr_id":
            "FHKST01010100"

        }


        });



        const data =
        result.data.output;



        res.json({

            name:data.hts_kor_isnm,

            price:
            Number(data.stck_prpr),


            change:
            data.prdy_ctrt,


            volume:
            Number(data.acml_vol),


            // 이동평균은 다음 단계에서 캔들 데이터 연결

            ma5:0,

            ma20:0,

            ma60:0


        });



    }


    catch(error){


        console.log(
        error.response?.data
        );


        res.status(500)
        .json({

            error:"주가 조회 실패"

        });


    }



});




// =======================================
// 서버 실행
// =======================================

app.listen(3000,()=>{


console.log(
"V11.2 API 서버 실행 : http://localhost:3000"
);


});
