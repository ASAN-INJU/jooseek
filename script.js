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
