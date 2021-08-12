//drawTime start----------------------------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height/2;
function drawTime(){
    let time = new Date();
    let today = time.toLocaleString();
    let todayArray = today.split('.');
    let startDay = new Date(todayArray[0], todayArray[1], todayArray[2]);
    let endDay = new Date("2021", "12", "14");
    let diff = endDay - startDay;
    const currDay = 24*60*60*1000;
    const leftVac = 38;
    let dDay = parseInt(diff/currDay - leftVac);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, x*2, y*2);

    ctx.fillStyle = "black";
    ctx.font = "18px serif";
    ctx.textAlign = "center";
    ctx.fillText(today, x, y-10);

    ctx.fillStyle = "black";
    ctx.font = "24px serif";
    ctx.textAlign = "center";
    ctx.fillText("앞으로 "+dDay+"일만 더,,,", x, y+20);
    }
setInterval(drawTime, 100);
//dropdown start----------------------------------------------
const dropBtt = document.getElementById('drop_btt');

function dropdown(){
    const dropChoice = document.getElementsByClassName("drop_choice");

    for(let i = 0; i < dropChoice.length; i += 1) {
        dropChoice.item(i).classList.toggle("show");
    }
}

dropBtt.addEventListener('click', dropdown);
//drawBar start------------------------------------------------
const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext("2d");

const plusS = document.querySelectorAll(".plus");
const minusS = document.querySelectorAll(".minus");
const countS = document.querySelectorAll(".count");
const weight = document.getElementById("weight");
const purpose = document.getElementById("purpose");
const p1 = "벌크업";
const p2 = "린매스업";
const p3 = "다이어트";
let sum = 0;

for(let i = 0; i < countS.length; i++){
    let count = countS.item(i);
    count.id = 0;
}

function proteinCal(){
    const weightV = weight.value;
    const purposeV = purpose.value;
    let X = weightV;

    if(purposeV == p1){
        X = X*2;
        clearBottle();
        drawAll(X);
    }
    if(purposeV == p2){
        X = X*1.5;
        clearBottle();
        drawAll(X);
    }
    if(purposeV == p3){
        X = X*1;
        clearBottle();
        drawAll(X);
    }
}

function drawAll(Xn){
    drawBar();
    drawGram(Xn);
    drawPercent();
}

function drawBar(){
    ctx2.fillStyle = "gray";
    ctx2.fillRect(25, 25, 325, 50);
}
function drawGram(Xn){
    ctx2.fillStyle = "black";
    ctx2.font = "14px serif";
    ctx2.textAlign = "right";
    ctx2.fillText(sum+"g  /  "+Xn+"g", 340, 15);
}
function drawPercent(){
    for(let i = 10, t = 0; i <= 80, t <= 260; i = i + 10, t = t + 32.5){
        ctx2.fillStyle = "black";
        ctx2.font = "10px serif";
        ctx2.fillText(i, 50+t, 90);
    }
}

function clearBottle(){
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    sum = 0;
    sum2 = 0;
    for(let i = 0; i < countS.length; i++){
        let count = countS.item(i);
        count.id = 0;
        count.innerHTML = count.id;
        };
    };
//프로틴 퍼센트 채우기---------------------------------------------------------------------
for(let i = 0; i < plusS.length; i++){
    let plus = plusS.item(i);
    plus.addEventListener('click', drawPlus);
};

function drawBottle(event){
    const weightV = weight.value;
    const purposeV = purpose.value;
    let X = weightV;

    if(purposeV == p1){
        X = X*2;
    }
    if(purposeV == p2){
        X = X*1.5;
    }
    if(purposeV == p3){
        X = X*1;
    }

    const food = event.target;
    const count = event.target.nextElementSibling;
    const foodId = parseInt(food.id);
    const n = (foodId+sum) / X;
    let per = 325*n;
    
    if(per > 325){
        per = 325;
    };
    if(sum < X){
        count.id++;
        count.innerHTML = count.id;
        };


    sum += foodId;

    if(sum > X){
        sum = X;
    };

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawAll(X);
    ctx2.fillStyle = "#fffab6";
    ctx2.fillRect(25, 25, per, 50);
    //추가하는 항목마다 이름과 색깔 구분 넣어주기
}

for(let i = 0; i < minusS.length; i++){
    let minus = minusS.item(i);
    minus.addEventListener('click', deleteBottle);
};
function deleteBottle(event){
    const weightV = weight.value;
    const purposeV = purpose.value;
    let X = weightV;

    if(purposeV == p1){
        X = X*2;
    }
    if(purposeV == p2){
        X = X*1.5;
    }
    if(purposeV == p3){
        X = X*1;
    }

    const food = event.target;
    const count = event.target.previousElementSibling;
    const foodId = parseInt(food.id);
    const n = (sum-foodId) / X;
    let per = 325*n;

    if(per < 0){
        per = 0;
    };

    if(count.id > 0){
        sum -= foodId;

        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        drawAll(X);

        ctx2.fillStyle = "#fffab6";
        ctx2.fillRect(25, 25, per, 50);

        count.id--;
        count.innerHTML = count.id;
    };

    if(sum < 0){
        sum = 0;
    };
    
    //추가하는 항목마다 이름과 색깔 구분 넣어주기

}

function reload(){
    location.reload();
}


const proteinCalBtt = document.getElementById("proteinCalBtt");
const clearBtt = document.getElementById("clearBtt");

proteinCalBtt.addEventListener('click', proteinCal);
clearBtt.addEventListener('click', reload);

let colorCode = [];
let sum2 = 0;

function drawPlus(event){
    const count = event.target.nextElementSibling;
    let gram = 0;
    //X값 측정
    const weightV = weight.value;
    const purposeV = purpose.value;
    let X = weightV;
    if(purposeV == p1){
        X = X*2;
    }
    if(purposeV == p2){
        X = X*1.5;
    }
    if(purposeV == p3){
        X = X*1;
    }
    //X값 측정 끝
    //count.id의 상한선을 drawPlus의 외부변수로 정하기.
    if(sum2 < 325){
    count.id++;
    count.innerHTML = count.id;
    };

    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    drawAll(X);

    for(let i = 0; i < countS.length; i++){
        let randomColor = "#"+Math.round(Math.random()*0xffffff).toString(16);
        colorCode.push(randomColor);
    };

    for(let i = 0; i < countS.length; i++){
        let count = countS.item(i);
        let countSum = count.previousElementSibling.id * count.id;
        const n = countSum / X;
        let per = 325*n;
        let showGram = gram / 325 * X;

        if(per > 325){
            per = 325;
        };
        /*if(gram > 325){
            gram = 325;
        }else{*/

            ctx2.fillStyle = colorCode[i];
            if(gram + per > 325){
                per = 325 - gram;
            };
            ctx2.fillRect(25 + gram, 25, per, 50);
            gram += per;
            drawGram2(showGram, X);
            sum2 = gram + per;
            //마지막에 30g을 추가하면 30g이 full로 채워지는 것 고치기
    };
};

function drawGram2(showGram, Xn){
    ctx2.clearRect(0, 0, canvas2.width, 25);
    ctx2.fillStyle = "black";
    ctx2.font = "14px serif";
    ctx2.textAlign = "right";
    ctx2.fillText(showGram+"g  /  "+Xn+"g", 340, 15);
};