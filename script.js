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

        "https://v11-api-server.onrender.com/api/price/" + code

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
