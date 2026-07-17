// =======================================
// V11.2 script.js
// GitHub Pages + API Server 연동
// =======================================

const API_URL = "http://localhost:3000";

// 종목 조회
async function getPrice() {

    const code = document.getElementById("stockCode").value.trim();

    if (!code) {
        alert("종목코드를 입력하세요.");
        return;
    }

    try {

        const res = await fetch(`${API_URL}/price?code=${code}`);

        const data = await res.json();

        document.getElementById("stockName").innerText = data.name;
        document.getElementById("price").innerText =
            Number(data.price).toLocaleString() + " 원";

        document.getElementById("change").innerText =
            data.change + "%";

        document.getElementById("volume").innerText =
            Number(data.volume).toLocaleString();

        analyze(data);

    } catch (e) {

        console.error(e);

        alert("API 연결 실패");

    }

}


// AI 분석
function analyze(data){

    let score = 50;

    if(data.change > 0) score += 10;

    if(data.volume > 1000000) score += 10;

    if(data.ma5 > data.ma20) score += 15;

    if(data.rsi < 35) score += 10;

    if(data.macd > 0) score += 5;

    let result = "";

    if(score >= 90){

        result="★★★★★ 매우 강한 매수";

    }else if(score >=80){

        result="★★★★☆ 매수";

    }else if(score >=70){

        result="★★★☆☆ 관심";

    }else if(score >=60){

        result="★★☆☆☆ 관망";

    }else{

        result="★☆☆☆☆ 매수 비추천";

    }

    document.getElementById("score").innerHTML =
    `
    <h2>${score} 점</h2>
    <h3>${result}</h3>
    `;

}


// 추천종목
async function loadRecommend(){

    try{

        const res = await fetch(`${API_URL}/recommend`);

        const list = await res.json();

        let html="";

        list.forEach(item=>{

            html+=`
            <tr>

                <td>${item.code}</td>

                <td>${item.name}</td>

                <td>${item.score}</td>

            </tr>
            `;

        });

        document.getElementById("recommendList").innerHTML=html;

    }catch(e){

        console.log(e);

    }

}


// 페이지 시작
window.onload=function(){

    loadRecommend();

};
