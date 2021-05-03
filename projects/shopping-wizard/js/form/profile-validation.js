/*
 * This function add classes to form elements
 * @ author:
 */
function addClasses(input, label, p) {
  input.classList.add("input-form-error");
  label.classList.add("label-form-error");
  p.classList.remove("hide");
  return false;
}

/*
 * This function removes classes to form elements
 * @ author:
 */
function removeClasses(input, label, p) {
  input.classList.remove("input-form-error");
  label.classList.remove("label-form-error");
  p.classList.add("hide");
  return false;
}

/*
 * This function validates username input
 * from profile page
 * @ author:
 */
export function validaUsername() {
  // get DOM elements
  const user = document.getElementById("Uname");
  const userLabel = document.querySelector('label[for="Uname"]');
  const userp = document.querySelector(".p-Uname");
  // toggle classes
  if (user.value == "" || user.value.length < 5) {
    addClasses(user, userLabel, userp);
    return false;
  } else {
    removeClasses(user, userLabel, userp);
    return true;
  }
}

/*
 * This function validates Email input
 * from profile page
 * @ author:
 */

export function validateEmail() {
  // get DOM elements
  const email = document.getElementById("email");
  const elabel = document.querySelector('label[for="email"]');
  const ep = document.querySelector(".p-email");
  //regular expresion
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value.trim())) {
    removeClasses(email, elabel, ep);
    return true;
  } else {
    addClasses(email, elabel, ep);
    return false;
  }
}
/*
 * This function create password field input
 * from profile page
 * @ author:
 */
// password field
var myInput = document.getElementById("pass");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var special = document.getElementById("special");
var leng = document.getElementById("lenght");
myInput.onfocus = function () {
  document.getElementById("checksField").style.display = "block";
};
myInput.onblur = function () {
  document.getElementById("checksField").style.display = "none";
};
myInput.onkeyup = function () {
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("wrong");
    letter.classList.add("correct");
  } else {
    letter.classList.remove("correct");
    letter.classList.add("wrong");
  }
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("wrong");
    capital.classList.add("correct");
  } else {
    capital.classList.remove("correct");
    capital.classList.add("wrong");
  }
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("wrong");
    number.classList.add("correct");
  } else {
    number.classList.remove("correct");
    number.classList.add("wrong");
  }
  var specials = /[!@#$%^&*]/g;
  if (myInput.value.match(specials)) {
    special.classList.remove("wrong");
    special.classList.add("correct");
  } else {
    special.classList.remove("correct");
    special.classList.add("wrong");
  }
  if (myInput.value.length > 7) {
    leng.classList.remove("wrong");
    leng.classList.add("correct");
  } else {
    leng.classList.remove("correct");
    leng.classList.add("wrong");
  }
};

/*
 * This function validate password input
 * from profile page
 * @ author:
 */
export function validatePass() {
  // get DOM elements
  const pass = document.getElementById("pass");
  const passlabel = document.querySelector('label[for="pass"]');
  const passp = document.querySelector(".p-Pass");
  //validate expresion
  const pwd = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;

  if (pass.value != "" && pwd.test(pass.value.trim())) {
    removeClasses(pass, passlabel, passp);
    return true;
  } else {
    addClasses(pass, passlabel, passp);
    return false;
  }
}

/*
 * This function Confirm password input
 * from profile page
 * @ author:
 */
export function confirmPass() {
  // get DOM elements
  const pass = document.getElementById("pass");
  const pass2 = document.getElementById("pwd2");
  const pass2label = document.querySelector('label[for="pwd2"]');
  const pass2p = document.querySelector(".p-pass2");

  if (
    document.getElementById("pass").value !=
      document.getElementById("pwd2").value ||
    document.getElementById("pwd2").value === ""
  ) {
    addClasses(pass2, pass2label, pass2p);
    return false;
  } else {
    removeClasses(pass2, pass2label, pass2p);
    return true;
  }
}

/*
 * This function validates all inputs
 * in profile page
 * @ author:
 */
export function formProfileValidity() {
  return validaUsername() && validateEmail() && validatePass() && confirmPass();
}

/*
 * This function gets data from all inputs
 * in profile page
 * @ author:
 */
export function getFormProfileData() {
  const obj = {};
  const d = document;
  // data required
  obj.userName = d.getElementById("Uname").value;
  obj.email = d.getElementById("email").value;
  obj.password = d.getElementById("pass").value;
  // return object
  return obj;
}

/*
 * This function clears data from all inputs
 * in profile page
 * @ author:
 */
export function clearFormProfileData() {
  const d = document;
  d.querySelector("section.profile form").reset();
}
