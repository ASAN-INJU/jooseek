// ===========================================
// V12 Ultimate script.js (1부)
// ===========================================

let stocks = [];
let chart = null;

// 종목목록 불러오기
async function loadStocks() {
    const res = await fetch("stocks.json");
    stocks = await res.json();
}

loadStocks();

// 자동검색
const input = document.getElementById("stockCode");

input.addEventListener("input", function () {

    const keyword = this.value.trim();

    const list = document.getElementById("suggestions");

    list.innerHTML = "";

    if (keyword.length < 1) return;

    const result = stocks.filter(s =>
        s.name.includes(keyword)
    ).slice(0, 10);

    result.forEach(stock => {

        const div = document.createElement("div");

        div.className = "item";

        div.innerHTML =
            stock.name +
            " (" +
            stock.code +
            ")";

        div.onclick = function () {

            input.value = stock.name;

            list.innerHTML = "";

            getPrice(stock.code);

        };

        list.appendChild(div);

    });

});

// 시세조회
async function getPrice(code){

    if(!code){

        alert("종목을 선택하세요.");

        return;

    }

    try{

        const response = await fetch(

"https://v11-api-server.onrender.com/api/stock/" + code

);

        const data = await response.json();

        updateScreen(data);

    }

    catch(e){

        alert("서버 연결 실패");

        console.log(e);

    }

}

// 화면표시

function updateScreen(data){

document.getElementById("name").innerHTML=data.name;

document.getElementById("price").innerHTML=
Number(data.price).toLocaleString()+"원";

document.getElementById("change").innerHTML=
data.change+"%";

document.getElementById("open").innerHTML=
Number(data.open).toLocaleString();

document.getElementById("high").innerHTML=
Number(data.high).toLocaleString();

document.getElementById("low").innerHTML=
Number(data.low).toLocaleString();

document.getElementById("volume").innerHTML=
Number(data.volume).toLocaleString();

document.getElementById("ma5").innerHTML=
Number(data.ma5).toLocaleString();

document.getElementById("ma20").innerHTML=
Number(data.ma20).toLocaleString();

document.getElementById("ma60").innerHTML=
Number(data.ma60).toLocaleString();

document.getElementById("target").innerHTML=
Number(data.target).toLocaleString();

document.getElementById("stop").innerHTML=
Number(data.stop).toLocaleString();

document.getElementById("score").innerHTML=
data.score+"점";

document.getElementById("signal").innerHTML=
data.signal;

drawChart(data);

makeAnalysis(data);

}
// ===========================================
// V12 Ultimate script.js (2부)
// 차트 + AI 분석
// ===========================================

// 차트 그리기
function drawChart(data){

    const ctx = document.getElementById("chart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{

        type:"line",

        data:{

            labels:["60일","20일","5일","현재"],

            datasets:[{

                label:"주가",

                data:[

                    data.ma60,

                    data.ma20,

                    data.ma5,

                    data.price

                ],

                tension:0.35

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false

        }

    });

}

// AI 분석
function makeAnalysis(data){

    let text = "";

    if(data.price > data.ma5){
        text += "✅ 현재가가 5일 이동평균선 위에 있습니다.<br>";
    }else{
        text += "⚠ 현재가가 5일 이동평균선 아래입니다.<br>";
    }

    if(data.ma5 > data.ma20){
        text += "✅ 단기 상승 추세입니다.<br>";
    }else{
        text += "⚠ 단기 추세가 약합니다.<br>";
    }

    if(data.ma20 > data.ma60){
        text += "✅ 중기 상승 추세입니다.<br>";
    }else{
        text += "⚠ 중기 추세가 약합니다.<br>";
    }

    if(data.score >= 90){

        text += "<br><b>★★★★★ 적극매수</b>";

    }else if(data.score >= 80){

        text += "<br><b>★★★★☆ 매수</b>";

    }else if(data.score >= 70){

        text += "<br><b>★★★☆☆ 관심</b>";

    }else if(data.score >= 60){

        text += "<br><b>★★☆☆☆ 관망</b>";

    }else{

        text += "<br><b>☆☆☆☆☆ 비추천</b>";

    }

    document.getElementById("analysis").innerHTML = text;

}

// 뉴스 표시
function updateNews(newsList){

    let html = "";

    newsList.forEach(item=>{

        html += `
        <p>
            <a href="${item.url}" target="_blank">
                ${item.title}
            </a>
        </p>
        `;

    });

    document.getElementById("news").innerHTML = html;

}
