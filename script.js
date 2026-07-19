// ===========================================
// V12 Ultimate script.js
// 1부 : 종목 검색 / 자동완성
// ===========================================


let stocks = [];

let chart = null;


// ===========================================
// 종목 목록 불러오기
// ===========================================

async function loadStocks(){

    try{

        const response = await fetch("stocks.json");

        stocks = await response.json();

        console.log(
            "종목 데이터 로딩 완료:",
            stocks.length
        );

    }

    catch(error){

        console.log(
            "stocks.json 로딩 실패",
            error
        );

    }

}


loadStocks();



// ===========================================
// 자동검색
// ===========================================

const input =
document.getElementById("stockCode");

const suggestionBox =
document.getElementById("suggestions");



if(input){


input.addEventListener(
"input",
function(){


    const keyword =
    this.value.trim();



    suggestionBox.innerHTML="";



    if(keyword.length < 1){

        return;

    }



    const result =
    stocks.filter(stock =>

        stock.name.includes(keyword)

    )
    .slice(0,10);



    result.forEach(stock => {



        const div =
        document.createElement("div");



        div.className="item";



        div.innerHTML =

        stock.name
        +
        " ("
        +
        stock.code
        +
        ")";



        div.onclick=function(){



            input.value =
            stock.name;



            suggestionBox.innerHTML="";



            // 선택한 종목 조회

            getPrice(stock.code);



        };



        suggestionBox.appendChild(div);



    });



});


}



// ===========================================
// 종목 코드 찾기
// 이름 입력 시 코드 변환
// ===========================================

function findStockCode(name){


    const stock =
    stocks.find(item =>

        item.name === name

    );



    if(stock){

        return stock.code;

    }


    return null;


}
// ===========================================
// V12 Ultimate script.js
// 2부 : API 연결 / 데이터 표시
// ===========================================


// ===========================================
// 한국투자증권 API 서버 조회
// ===========================================

async function getPrice(code){


    if(!code){

        alert("종목을 선택하세요.");

        return;

    }



    try{


        const response = await fetch(

            "https://v11-api-server.onrender.com/api/stock/"
            +
            code

        );



        const data = await response.json();



        console.log(
            "서버 응답:",
            data
        );



        if(!data.success){


            alert(
                data.message ||
                "조회 실패"
            );


            return;


        }



        updateScreen(data);



    }

    catch(error){


        console.log(
            "API 오류:",
            error
        );


        alert(
            "서버 연결 실패"
        );


    }


}





// ===========================================
// 화면 표시
// ===========================================


function updateScreen(data){



    const setText = (id,value)=>{


        const element =
        document.getElementById(id);



        if(element){

            element.innerHTML=value;

        }


    };




    setText(
        "name",
        data.name
    );



    setText(
        "price",

        Number(data.price)
        .toLocaleString()
        +
        "원"

    );



    setText(
        "change",

        data.change
        +
        "%"

    );



    setText(
        "open",

        Number(data.open || 0)
        .toLocaleString()

    );



    setText(
        "high",

        Number(data.high || 0)
        .toLocaleString()

    );



    setText(
        "low",

        Number(data.low || 0)
        .toLocaleString()

    );



    setText(
        "volume",

        Number(data.volume || 0)
        .toLocaleString()

    );



    setText(
        "ma5",

        Number(data.ma5 || 0)
        .toLocaleString()

    );



    setText(
        "ma20",

        Number(data.ma20 || 0)
        .toLocaleString()

    );



    setText(
        "ma60",

        Number(data.ma60 || 0)
        .toLocaleString()

    );



    setText(
        "target",

        Number(data.target || 0)
        .toLocaleString()

    );



    setText(
        "stop",

        Number(data.stop || 0)
        .toLocaleString()

    );



    setText(
        "score",

        data.score
        +
        "점"

    );



    setText(
        "signal",

        data.signal

    );



    // 차트 연결

    drawChart(data);



    // AI 분석

    makeAnalysis(data);



}
// ===========================================
// V12 Ultimate script.js
// 3부 : 차트 / AI 분석 / 뉴스
// ===========================================



// ===========================================
// 차트 표시
// ===========================================

function drawChart(data){


    const canvas =
    document.getElementById("chart");



    if(!canvas){

        return;

    }



    if(chart){

        chart.destroy();

    }




    chart = new Chart(

        canvas,

        {

            type:"line",


            data:{


                labels:[

                    "MA60",

                    "MA20",

                    "MA5",

                    "현재"

                ],



                datasets:[{


                    label:"주가 흐름",



                    data:[


                        data.ma60 || 0,

                        data.ma20 || 0,

                        data.ma5 || 0,

                        data.price || 0


                    ],



                    tension:0.3


                }]


            },



            options:{


                responsive:true,


                maintainAspectRatio:false



            }


        }


    );


}







// ===========================================
// AI 분석
// ===========================================


function makeAnalysis(data){



    let text="";



    if(data.price > data.ma5){


        text +=

        "✅ 현재가가 5일 이동평균 위에 있습니다.<br>";

    }

    else{


        text +=

        "⚠ 현재가가 5일 이동평균 아래입니다.<br>";

    }





    if(data.ma5 > data.ma20){


        text +=

        "✅ 단기 상승 흐름입니다.<br>";

    }

    else{


        text +=

        "⚠ 단기 추세가 약합니다.<br>";

    }





    if(data.ma20 > data.ma60){


        text +=

        "✅ 중기 상승 흐름입니다.<br>";

    }

    else{


        text +=

        "⚠ 중기 추세가 약합니다.<br>";

    }





    text += "<br>";



    if(data.signal){


        text +=

        "<b>"
        +
        data.signal
        +
        "</b><br>";


    }



    text +=

    "분석 점수 : "
    +
    data.score
    +
    "점<br>";



    text +=

    "목표가 : "
    +
    Number(data.target || 0)
    .toLocaleString()
    +
    "원<br>";



    text +=

    "손절가 : "
    +
    Number(data.stop || 0)
    .toLocaleString()
    +
    "원";





    const box =
    document.getElementById("analysis");



    if(box){


        box.innerHTML=text;


    }



}







// ===========================================
// 뉴스 표시
// ===========================================


function updateNews(newsList){



    const box =
    document.getElementById("news");



    if(!box){

        return;

    }



    let html="";



    if(!newsList || newsList.length===0){


        box.innerHTML =
        "뉴스 데이터 없음";


        return;


    }





    newsList.forEach(news=>{


        html +=

        `
        <p>
        <a href="${news.url}" target="_blank">
        ${news.title}
        </a>
        </p>
        `;


    });




    box.innerHTML=html;



}
