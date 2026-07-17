// =======================================
// V11.3 Ultimate
// script.js
// =======================================

const API_URL = "http://localhost:3000";

let stockList = [];
let chart = null;

// --------------------
// 종목 목록 불러오기
// --------------------
async function loadStocks() {
    try {
        const res = await fetch("stocks.json");
        stockList = await res.json();
    } catch (e) {
        console.log("stocks.json 로드 실패", e);
    }
}

// --------------------
// 자동완성
// --------------------
function setupAutocomplete() {

    const input = document.getElementById("stockCode");
    const box = document.getElementById("suggestions");

    input.addEventListener("input", () => {

        const keyword = input.value.trim().toLowerCase();

        if (keyword.length === 0) {
            box.innerHTML = "";
            return;
        }

        const result = stockList.filter(item =>
            item.name.toLowerCase().includes(keyword) ||
            item.code.includes(keyword)
        ).slice(0, 10);

        box.innerHTML = "";

        result.forEach(item => {

            const div = document.createElement("div");

            div.innerHTML =
                `${item.name} (${item.code})`;

            div.onclick = () => {

                input.value = item.code;

                box.innerHTML = "";

                getPrice();

            };

            box.appendChild(div);

        });

    });

}
