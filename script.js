//variables
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
let itemArray = [];
const LSArray = 'todos';
const checked_Class = "checked";
/*checkList
function checkList(event){
    const check = event.target;
    const li = check.parentNode;
    const check_Class = "checked";
    const span = li.querySelector('span');

    span.classList.toggle(check_Class);

}*/

function checkL(event){
    const check = event.target;
    const li = check.parentNode;
    const liId = li.id - 1;
    const span = li.querySelector('span');

    if(!itemArray[liId].className){
        itemArray[liId].className = checked_Class;
        span.className = checked_Class;
        //check.checked = true;
        saveList();
    }else{
        delete itemArray[liId].className;
        span.className = null;
        saveList();
        }
}

//deleteList
function deleteList(event){
    const deleteBtt = event.target;
    const li = deleteBtt.parentNode;
    list.removeChild(li);

    const cleanArray = itemArray.filter(function(element){
        return element.id !== parseInt(li.id);
    });

    itemArray = cleanArray;
    saveList();
}
//saveList
function saveList(){
    localStorage.setItem(LSArray, JSON.stringify(itemArray));
}
//addList
function addList(content, className){
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btt = document.createElement('button');
    const check = document.createElement('input');
    const newId = itemArray.length + 1;
    const listObj = {
        content,
        id: newId,
    };

    span.innerText = content;
    btt.innerHTML = 'X';
    btt.addEventListener('click', deleteList);
    check.setAttribute('type', 'checkbox');
    check.addEventListener('change', checkL);

    if(className == checked_Class){
        listObj.className = checked_Class;
        span.className = checked_Class;
        check.checked = true;
    };

    li.id = newId;

    li.appendChild(check);
    li.appendChild(btt);
    li.appendChild(span);
    list.appendChild(li);

    itemArray.push(listObj);
    saveList();
}
//submithandler
function submithandler(event){
    event.preventDefault();
    const inputValue = input.value;
    addList(inputValue);
    input.value = "";
}
//showList
function showList(){
    const getArray = localStorage.getItem(LSArray);
    if(getArray !== null){
        const parsedLSArray = JSON.parse(getArray);
        parsedLSArray.forEach(function (element){
            addList(element.content, element.className);
        });
    }
}
showList();
form.addEventListener('submit', submithandler);

// CANVAS PART----------------------------------------------
const canvas = document.getElementById('canvas'); //
const ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height/2;
let dx = 10;
let dy = -10;
let ballRadius = 10;
let ballColor = "black";
// canvas에서 기준점은 좌상단

/*function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColor;
    ctx.fill();
    ctx.closePath();
}

function changeBallColor(){
    const randomColorArray = ["red", "blue", "yellow", "black", "green"];
    const randomNum = Math.floor(Math.random() * randomColorArray.length);
    let randomColor = randomColorArray[randomNum];

    if(ballColor != randomColor){
        ballColor = randomColor;
        ctx.fill();
    };
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawBall();

    if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
        dx = -dx;
        changeBallColor();
    }
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
        changeBallColor();
    }

    x += dx;
    y += dy;
}*/

//Widget (time)--------------------------------------------------


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