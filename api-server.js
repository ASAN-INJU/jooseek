const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;


// 한국투자증권 토큰
let accessToken = "";

async function getToken(){

    const url =
    "https://openapi.koreainvestment.com:9443/oauth2/tokenP";

    const result = await axios.post(
        url,
        {
            grant_type:"client_credentials",
            appkey:process.env.APP_KEY,
            appsecret:process.env.APP_SECRET
        }
    );

    accessToken = result.data.access_token;

    return accessToken;
}



// 주가 조회
app.get("/price", async(req,res)=>{

    try{

        const code=req.query.code;


        if(!accessToken){
            await getToken();
        }


        const url =
        "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price";


        const response = await axios.get(url,{
            headers:{
                "authorization":
                "Bearer "+accessToken,

                "appkey":
                process.env.APP_KEY,

                "appsecret":
                process.env.APP_SECRET,

                "tr_id":
                "FHKST01010100"
            },

            params:{
                FID_COND_MRKT_DIV_CODE:"J",
                FID_INPUT_ISCD:code
            }
        });



        const d=response.data.output;


        res.json({

            name:d.hts_kor_isnm,

            price:Number(d.stck_prpr),

            change:d.prdy_ctrt,

            volume:Number(d.acml_vol),

            ma5:0,

            ma20:0,

            ma60:0

        });


    }catch(e){

        console.log(e.response?.data);

        res.status(500).json({
            error:"주가 조회 실패"
        });

    }

});



app.listen(PORT,()=>{

console.log(
"V11.2 API 서버 실행 : "+PORT
);

});
