// =======================================
// V11.3 Ultimate
// 종목 자동완성
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

        if (!res.ok) {
            throw new Error("stocks.json 로드 실패");
        }

        stockList = await res.json();

        console.log("종목수 :", stockList.length);

    } catch (e) {

        console.error(e);

        stockList = [];

    }

}

// --------------------
// 자동완성
// --------------------
function setupAutocomplete() {

    const input = document.getElementById("stockCode");
    const box = document.getElementById("suggestions");

    if (!input || !box) {
        console.warn("자동완성 요소를 찾을 수 없습니다.");
        return;
    }

    input.addEventListener("input", function () {

        const keyword = this.value.trim().toLowerCase();

        box.innerHTML = "";

        if (keyword.length < 1) {
            return;
        }

        const result = stockList.filter(item => {

            return (
                item.name.toLowerCase().includes(keyword) ||
                item.code.includes(keyword)
            );

        }).slice(0, 10);

        result.forEach(item => {

            const div = document.createElement("div");

            div.className = "suggest-item";

            div.textContent =
                `${item.name} (${item.code})`;

            div.onclick = function () {

                input.value = item.code;

                box.innerHTML = "";

                getPrice();

            };

            box.appendChild(div);

        });

    });

    // 엔터키 검색
    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            box.innerHTML = "";

            getPrice();

        }

    });

    // 화면 다른 곳 클릭 시 목록 숨김
    document.addEventListener("click", function (e) {

        if (
            e.target !== input &&
            !box.contains(e.target)
        ) {

            box.innerHTML = "";

        }

    });

}

// --------------------
// 페이지 시작
// --------------------
function setupAutocomplete() {

    ...
}


// 여기에 getPrice() 함수 추가


window.onload = async function () {

    await loadStocks();

    setupAutocomplete();

};
window.onload = async function () {

    await loadStocks();

    setupAutocomplete();

};
