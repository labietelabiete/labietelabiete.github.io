const bigPict = document.getElementsByClassName('big-picture')[0].lastElementChild;
/*Get thumbnails*/
const thumbs = document.querySelector('.thumbnail-wrapper').getElementsByClassName('img-thumbnail');
const colorThumbails = document.querySelectorAll(".color-thumbnails-wrapper img");
const selectedColor = document.getElementById('prod-color');
/* Add event listeners to thumbnails */
for (let thumb of thumbs) {
    /*thumb.addEventListener('click', changeProductPicture);*/
    thumb.addEventListener('mouseover', changeProductPictureByHover);
    for (let i = 0; i < colorThumbails.length; i++) {
      colorThumbails[i].addEventListener('click', changeProductPicture);
    }
}

/* Changing product picture */
function changeProductPicture (event) {
  bigPict.src = event.target.src;
  switch (event.target.dataset.color) {
    case "Black":
      thumbs[0].src="./images/black-01.png";
      thumbs[1].src="./images/black-02.png";
      thumbs[2].src="./images/black-03.png";
      thumbs[3].src="./images/black-04.png";
      break;
    case "Red":
      thumbs[0].src="./images/red-01.png";
      thumbs[1].src="./images/red-02.png";
      thumbs[2].src="./images/red-03.png";
      thumbs[3].src="./images/red-04.png";
      break;
    case "Green":
      thumbs[0].src="./images/green-01.png";
      thumbs[1].src="./images/green-02.png";
      thumbs[2].src="./images/green-03.png";
      thumbs[3].src="./images/green-04.png";
      break;
    case "Yellow":
      thumbs[0].src="./images/yellow-01.png";
      thumbs[1].src="./images/yellow-02.png";
      thumbs[2].src="./images/yellow-03.png";
      thumbs[3].src="./images/yellow-04.png";
      break;
    case "Blue":
      thumbs[0].src="./images/Blue-01.png";
      thumbs[1].src="./images/Blue-02.png";
      thumbs[2].src="./images/Blue-03.png";
      thumbs[3].src="./images/Blue-04.png";
      break;
  }
  selectedColor.innerText = event.target.dataset.color;
}

function changeProductPictureByHover(event){
  bigPict.src = event.target.src;
}

/*
 * This adds event listeners to DOM elements
 * waits for all elements loaded
 * @ author:
 */
document.addEventListener("DOMContentLoaded", (event) => {
  colorThumbails.forEach((element) => {
    element.addEventListener("click", fnColorThumbails);
  });
  // Listener change on html "select tag"
  document.getElementById("idSize").addEventListener("change", fnSizePrice);
});

/*
 * This updates thumbnails selection,
 * and upadtes price based on selection
 * of color.
 * @ author:
 */
function fnColorThumbails(event) {
  // get DOM element price
  const $price = document.querySelector(".price-wrapper h3");
  // get custom proporty yellow color
  const borderColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--teamLightblue");
  // clear previous selection
  const colorThumbails = document.querySelectorAll(
    ".color-thumbnails-wrapper img"
  );
  colorThumbails.forEach((element) => {
    element.style.border = "none";
  });
  // get selected data and switch price
  const selectedColor = event.target.dataset.color;
  calculatePriceColor(selectedColor);
  // update price
  $price.textContent = getFinalPrice() + "€";
  // Set border color to thumnails
  event.target.style.border = `2px solid ${borderColor}`;
}

/*
 * This upadtes price based on size selection
 * @ author:
 */
function fnSizePrice(event) {
  // get DOM element price
  const $price = document.querySelector(".price-wrapper h3");
  // get selected data and switch price
  const selectedSize = document.getElementById("idSize").value;
  calculatePriceSize(selectedSize);
  // update price
  $price.textContent = getFinalPrice() + "€";
}

/*
 * This function calculates price based on
 * color options
 * @ author:
 */
function calculatePriceColor(color = "Blue") {
  // color pricing
  switch (color) {
    case "Black":
      objPrice.color = 59.95;
      break;
    case "Red":
      objPrice.color = 65.95;
      break;
    case "Green":
      objPrice.color = 75.95;
      break;
    case "Yellow":
      objPrice.color = 69.95;
      break;
    case "Blue":
      objPrice.color = 64.95;
      break;
        default:
      break;
  }
}

/*
 * This function calculates price based on
 * size options
 * @ author:
 */
function calculatePriceSize(size = 38) {
  // size pricing
  switch (size) {
    case "38":
      objPrice.size = 0;
      break;
    case "39":
      objPrice.size = 0;
      break;
    case "40":
      objPrice.size = 2;
      break;
    case "41":
      objPrice.size = 2;
      break;
    case "42":
      objPrice.size = 5;
      break;
    case "43":
      objPrice.size = 5;
      break;
    case "44":
      objPrice.size = 10;
      break;
    case "45":
      objPrice.size = 10;
      break;
    default:
      break;
  }
}

/*
 * This function calculates price based on
 * size options
 * @ author:
 */
function getFinalPrice() {
  return (objPrice.color + objPrice.size).toFixed(2);
}
/*
 * price object
 * @ author:
 */
let objPrice = {
  color: 59.95,
  size: 2.0,
};

/* Page load */
window.addEventListener("load", () => {
  document.querySelector("body").classList.add("loaded"); 
 });