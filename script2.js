const canvas = document.getElementById('canvas'); //
const canvas2 = document.getElementById('canvas2');
const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
let x = canvas.width/2;
let y = canvas.height/2;
//drawTime start----------------------------------------------
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
const plusS = document.querySelectorAll(".plus");
const minus = document.querySelectorAll(".minus");

function proteinCal(){
    const weight = document.getElementById("weight");
    const purpose = document.getElementById("purpose");
    const weightV = weight.value;
    const purposeV = purpose.value;
    const p1 = "벌크업";
    const p2 = "린매스업";
    const p3 = "다이어트";
    let X = weightV;
    let t = 1;

    if(purposeV == p1){
        X = X*2;
        drawAll(X);
    }
    if(purposeV == p2){
        X = X*1.5;
        drawAll(X);
    }
    if(purposeV == p3){
        X = X*1;
        drawAll(X);
    }

    for(let i = 0; i < plusS.length; i++){
        let plus = plusS.item(i);
        plus.addEventListener('click', drawBottle);
    };

    function drawBottle(event){
        const food = event.target;
        const foodId = food.id;
        const n = foodId / X
        let per = 325*n;
        
        if(per*t <= 325){
        ctx2.fillStyle = "#fffab6";
        ctx2.fillRect(25, 25, per*t, 50);
        t = t + 1;
        }
    }
}

function drawAll(Xn){
    clearBottle();
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
    ctx2.fillText(Xn+"g", 320, 15);
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
}
const proteinCalBtt = document.getElementById("proteinCalBtt");
const clearBtt = document.getElementById("clearBtt");

proteinCalBtt.addEventListener('click', proteinCal);
clearBtt.addEventListener('click', clearBottle);

