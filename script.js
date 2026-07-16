// =======================================
// V11.2 주식 단타 분석
// script.js
// 한국투자증권 API 연결용
// =======================================


async function getPrice() {


    const code =
        document.getElementById("stockCode").value.trim();


    if(code === ""){
        alert("종목코드를 입력하세요");
        return;
    }


    try {


        // API 서버 요청
        const response = await fetch(
"https://v11-api-server.onrender.com/price?code=" + code
 );

        const data = await response.json();



        console.log(data);



        // 화면 출력

        document.getElementById("stockName").innerText =
            data.name || "-";


        document.getElementById("price").innerText =
            Number(data.price).toLocaleString() + " 원";


        document.getElementById("change").innerText =
            data.change + "%";


        document.getElementById("volume").innerText =
            Number(data.volume).toLocaleString();



        // 이동평균

        document.getElementById("ma5").innerText =
            data.ma5 || "-";


        document.getElementById("ma20").innerText =
            data.ma20 || "-";


        document.getElementById("ma60").innerText =
            data.ma60 || "-";



        // AI 분석

        let signal = "관망";


        if(
            data.price > data.ma5 &&
            data.ma5 > data.ma20
        ){

            signal = "🟢 매수 관심";

        }


        else if(
            data.price < data.ma20
        ){

            signal = "🔴 매도 주의";

        }



        document.getElementById("signal")
        .innerText = signal;



    }


    catch(error){


        console.error(error);


        alert(
            "서버 연결 실패\napi-server.js 실행 확인"
        );


    }



}



// =======================================
// 관심종목 클릭
// =======================================


document
.querySelectorAll("#favoriteList li")
.forEach(item=>{


    item.onclick=function(){


        let code =
        this.innerText.substring(0,6);


        document.getElementById(
            "stockCode"
        ).value = code;



        getPrice();


    }


});
