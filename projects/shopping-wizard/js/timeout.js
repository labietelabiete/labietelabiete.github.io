import { clearFormAddressData } from "./form/address-validation.js";
import { clearFormProfileData } from "./form/profile-validation.js";
import { ClearFormShipping, startAgain  } from "./button-page-flow.js";

let totalTime = 0;
let counterTime = 0;
let timerResult;

/*
 * This function sets timers
 * @ author:
 */
// button buy from html //
let btn = document.getElementById("buy-btn");
// start timer listener
btn.addEventListener("click", function (e) {
  e.preventDefault;
  // increment minutes
  timerResult = setInterval(() => {
    counterTime++;
    totalTime++;
    if (counterTime >= 60 && totalTime < 299) {
      const header = document.querySelector("header");
      insertTimer(totalTime, header);
      counterTime = 0;
    }
    // time up
    if (totalTime >= 300) {
      insertTimeUp();
      reseTimer();
    }
  }, 1000);
});

/*
 * This function updates html elements
 * @ author:
 */
function insertTimer(counter, element, timeRemove = 5000) {
  // innerhtml code
  let htmlCode = `
        <article class="timer" id="timer">
            <span>You started registering</span><br>
            <span class="minutes"> ${counter / 60} minute ago</span><br><br>
            <p>Hurry up!</p>
        </article>`;
  element.insertAdjacentHTML("afterbegin", htmlCode);
  setTimeout(() => {
    document.getElementById("timer").remove();
  }, timeRemove);
}

/*
 * This function stops timer
 * @ author:
 */
function stoptimer() {
  clearInterval(timerResult);

}
function reseTimer() {
  clearInterval(timerResult);
  counterTime = 0;
  totalTime = 0;
  regresiveTime = 5;
}

/*
 * This function forms the string
 * to disply total timer
 * @ author:
 */
function format(time) {
  // Hours, minutes and seconds
  let hrs = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;
  let ret = "";
  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }
  if (mins === 1) {
    ret += "" + mins + " minute and " + (secs < 10 ? "0" : "");
  } else if (mins > 1) {
    ret += "" + mins + " minutes and " + (secs < 10 ? "0" : "");
  }
  ret += "" + secs + " seconds";
  return ret;
}

/*
 * This event displays total time
 * in shipping finish section
 * @ author:
 */
document
  .getElementById("btn-buy-now-finished")
  .addEventListener("click", function () {
    // stop interval
    stoptimer();
    // display total time
    const btotalTime = document.querySelector("p#total-time b");
    btotalTime.textContent = ` ${format(totalTime)}`;
    btotalTime.style.fontWeight = "Bold";
  });

/*
 * This event stops timer in
 * start again button
 * @ author:
 */
document
  .getElementById("btn-start-again")
  .addEventListener("click", function () {
    // stop interval
    reseTimer();
  });

/*
 * This sets time up
 * in shipping finish section
 * @ author:
 */
let regresiveTime = 5;
function insertTimeUp(timeRemove = 1000) {
  // innerhtml code
  const divTimeUp = document.querySelector(".timeout-error");
  // toggle hide class to hide time up div
  divTimeUp.classList.toggle("hide");

  let xp = setInterval(() => {
    const timerUp = document.getElementById("timerUp");
    if (timerUp !== null) {
      timerUp.remove();
    }
    let htmlCode = `
    <article class="timer" id="timerUp">
    <span>Sorry your time is up!</span><br><br>
    <span class="minutes">This purchase will end in: ${regresiveTime} s</span><br><br>
    </article>`;
    // insert time up message
    // reload page
    if (regresiveTime === 0) {
      // hide div high z-index
      divTimeUp.classList.toggle("hide");
      timerUp.remove();
      stoptimer();
      startAgain();
      clearFormAddressData();
      clearFormProfileData();
      ClearFormShipping();
      clearInterval(xp);
    } else {
      divTimeUp.insertAdjacentHTML("afterend", htmlCode);
    }

    regresiveTime--;
  }, timeRemove);
}
