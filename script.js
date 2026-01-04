let btns = ["b1", "b2", "b3", "b4"];
let gameClicks = [];
let prevClicks = [];
let started = false;
let level = 0;
let h3 = document.querySelector("h3");

document.addEventListener("keydown", (event) => {
    if (!started) {
        console.log("game Started");
        started = true;
        levelUp();
    }
})
function levelUp() {
    prevClicks = [];
    level++;
    h3.innerText = `Level ${level}`;

    let ranNum = Math.floor(Math.random() * btns.length);
    let ranBtn = btns[ranNum];
    let btn = document.querySelector(`#${ranBtn}`);
    gameClicks.push(ranBtn);
    btnFlash(btn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}
function userFlash() {
    let btn = this;
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 250);

    let userbtn = btn.getAttribute("id");
    prevClicks.push(userbtn);

    checkAns();
}

let boxes = document.querySelectorAll(".box");
for (let b of boxes) {
    b.addEventListener("click", userFlash);
}

function checkAns() {
    let idx = prevClicks.length - 1;
    if (prevClicks[idx] === gameClicks[idx]) {
        if (prevClicks.length === gameClicks.length) {
            setTimeout(levelUp, 1000);
        }
        console.log("same value");
    } else {
        h3.innerHTML = `Game Over <b>Score ${level}<b> <br>(press any key to start)`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
           document.querySelector("body").style.backgroundColor="#fff"; 
        },250);
         gameClicks = [];
         prevClicks = [];
         started = false;
         level = 0;
    }
}