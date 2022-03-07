const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const CANVAS_SIZE = 500;

ctx.strokeStyle = "#2c2c2c";
ctx.fillStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

let painting = false;
let filling = false;

function startPainting(event){
    painting = true;
}

function stopPainting(event){
    painting = false;
}

function onMouseMove(event){    
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    console.log(color);
}

Array.from(colors).forEach(color =>
     color.addEventListener("click", changeColor));

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
}

function rangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
    console.log(size);
}

if(range){
    range.addEventListener("input", rangeChange);
}

function modeClick(event){
    if(filling == true){
        filling = false;
        mode.innerText = "fill";
    } else {
        filling = true;
        mode.innerText = "paint";
    }
}

if(mode){
    mode.addEventListener("click", modeClick);
}

function canvasClick(event){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

