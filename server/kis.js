const axios = require("axios");

let accessToken = null;


async function getAccessToken(){

    if(accessToken){
        return accessToken;
    }

    try{

        const res = await axios.post(
            process.env.KIS_BASE_URL +
            "/oauth2/tokenP",
            {
                grant_type:"client_credentials",
                appkey:process.env.APP_KEY,
                appsecret:process.env.APP_SECRET
            }
        );


        accessToken = res.data.access_token;

        console.log("✅ 토큰 발급 성공");

        return accessToken;


    }catch(error){

        console.log(
          "❌ 토큰 발급 실패",
          error.response?.data || error.message
        );

        throw error;
    }

}



async function getPrice(stockCode){

    const token = await getAccessToken();


    const result = await axios.get(
        process.env.KIS_BASE_URL +
        "/uapi/domestic-stock/v1/quotations/inquire-price",
        {
            headers:{
                "authorization":"Bearer "+token,
                "appkey":process.env.APP_KEY,
                "appsecret":process.env.APP_SECRET,
                "tr_id":"FHKST01010100"
            },

            params:{
                "fid_cond_mrkt_div_code":"J",
                "fid_input_iscd":stockCode
            }
        }
    );


    return {
        price:
        Number(result.data.output.stck_prpr),

        volume:
        Number(result.data.output.acml_vol)
    };

}


module.exports={
    getPrice
};
