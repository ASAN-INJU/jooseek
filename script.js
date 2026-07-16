const API_URL = "http://localhost:3000";

async function getPrice() {

    const code = document.getElementById("stockCode").value.trim();

    if (!code) {
        alert("종목코드를 입력하세요.");
        return;
    }

    try {

        const response = await fetch(`${API_URL}/price/${code}`);

        if (!response.ok) {
            throw new Error("서버 연결 실패");
        }

        const data = await response.json();

        document.getElementById("stockName").textContent =
            data.name || "-";

        document.getElementById("price").textContent =
            Number(data.price).toLocaleString() + " 원";

        document.getElementById("change").textContent =
            (data.change ?? 0) + "%";

        document.getElementById("volume").textContent =
            Number(data.volume ?? 0).toLocaleString();

        document.getElementById("ma5").textContent =
            data.ma5 ?? "-";

        document.getElementById("ma20").textContent =
            data.ma20 ?? "-";

        document.getElementById("ma60").textContent =
            data.ma60 ?? "-";

        let signal = "관망";

        if ((data.score ?? 0) >= 80) {
            signal = "🟢 매수";
        } else if ((data.score ?? 0) >= 60) {
            signal = "🟡 관심";
        } else {
            signal = "🔴 관망";
        }

        document.getElementById("signal").textContent = signal;

    } catch (err) {

        console.error(err);

        alert("API 서버 연결에 실패했습니다.");

    }

}

window.onload = () => {

    getPrice();

    setInterval(getPrice, 5000);

};
