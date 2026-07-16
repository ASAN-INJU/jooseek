// =======================================
// V11.2 GitHub Pages 테스트용 script.js
// =======================================

async function getPrice(){

    const code =
    document.getElementById("stockCode").value;


    // 현재는 테스트 데이터
    // 이후 API 서버 연결 시 교체

    const data = {

        name: "삼성전자",

        price: 83500,

        change: 1.25,

        volume: 15234567,

        ma5: 82800,

        ma20: 81500,

        ma60: 79000,

        score: 82

    };


    document.getElementById("stockName")
    .textContent = data.name;


    document.getElementById("price")
    .textContent =
    data.price.toLocaleString()+" 원";


    document.getElementById("change")
    .textContent =
    data.change+" %";


    document.getElementById("volume")
    .textContent =
    data.volume.toLocaleString();


    document.getElementById("ma5")
    .textContent =
    data.ma5.toLocaleString();


    document.getElementById("ma20")
    .textContent =
    data.ma20.toLocaleString();


    document.getElementById("ma60")
    .textContent =
    data.ma60.toLocaleString();



    let signal="관망";


    if(data.score >= 80){

        signal="🟢 매수 관심";

    }
    else if(data.score >=60){

        signal="🟡 관심";

    }


    document.getElementById("signal")
    .textContent=signal;

}



// 페이지 열면 자동 실행

window.onload=function(){

    getPrice();

};
