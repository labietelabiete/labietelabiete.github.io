/*
 * This function add classes to form elements
 * @ author:
 */
function addClasses(input, label, p) {
  input.classList.add("input-form-error");
  label.classList.add("label-form-error");

  if (p.classList.contains("hide")) {
    p.classList.remove("hide");
  }
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
 * This function validates first name input
 * from adress page
 * @ author:
 */
export function validFirstName() {
  // get DOM elements
  const xInput = document.getElementById("fname");
  const xLabel = document.querySelector('label[for="Fname"]');
  const xp = document.querySelector(".p-fname");
  // toggle classes
  if (xInput.value == "") {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function validates last name input
 * from adress page
 * @ author:
 */
export function validLastName() {
  // get DOM elements
  const xInput = document.getElementById("lname");
  const xLabel = document.querySelector('label[for="Lname"]');
  const xp = document.querySelector(".p-lname");
  // toggle classes
  if (xInput.value == "") {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function validates birthday input
 * from adress page
 * @ author:
 */
export function validBirthday() {
  // get DOM elements
  const xInput = document.getElementById("Birthday");
  const xLabel = document.querySelector('label[for="Birthday"]');
  const xp = document.querySelector(".p-birthday");
  // toggle classes
  if (!xInput.validity.valid) {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function validates address1 input
 * from adress page
 * @ author:
 */
export function validAdress() {
  // get DOM elements
  const xInput = document.getElementById("address1");
  const xLabel = document.querySelector('label[for="address1"]');
  const xp = document.querySelector(".p-address1");
  // toggle classes
  if (!xInput.validity.valid) {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function validates postal code input
 * from adress page
 * @ author:
 */
export function validPostalCode() {
  // get DOM elements
  const xInput = document.getElementById("pcode");
  const xLabel = document.querySelector('label[for="pcode"]');
  const xp = document.querySelector(".p-pcode");
  // toggle classes
  if (!xInput.validity.valid) {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function validates phone number input
 * from adress page
 * @ author:
 */
export function validPhoneNumber() {
  // get DOM elements
  const xInput = document.getElementById("tel");
  const xLabel = document.querySelector('label[for="Phone"]');
  const xp = document.querySelector(".p-tel");
  // toggle classes
  if (!xInput.validity.valid) {
    addClasses(xInput, xLabel, xp);
    return false;
  } else {
    removeClasses(xInput, xLabel, xp);
    return true;
  }
}

/*
 * This function match country and prefix phone number
 * from adress page
 * @ author:
 */
const selCountry = document.querySelector('#country');
const opCountry = document.querySelectorAll('.country-option');
const opCode = document.querySelectorAll('.code-option');

selCountry.addEventListener('change', matchCountryCode);

function matchCountryCode(){
  console.log('Entra aqui');
  for (let i = 0; i < opCountry.length; i++) {
    if (opCountry[i].selected == true){
      opCode[i].selected = true;
    }
  }
}

/*
 * This function validates all inputs
 * in adress page
 * @ author:
 */
export function formAdressValidity() {
  return (
    validFirstName() &&
    validLastName() &&
    validBirthday() &&
    validAdress() &&
    validPostalCode() &&
    validPhoneNumber()
  );
}

/*
 * This function gets data from all inputs
 * in address page
 * @ author:
 */
export function getFormAddressData() {
  const obj = {};
  const d = document;
  // store data
  obj.firstName = d.getElementById("fname").value;
  obj.lastName = d.getElementById("lname").value;
  obj.birthday = d.getElementById("Birthday").value;
  obj.address = d.getElementById("address1").value;
  obj.postalCode = d.getElementById("pcode").value;
  obj.phoneNumber = d.getElementById("tel").value;
  // return object
  return obj;
}

/*
 * This function clears data from all inputs
 * in address page
 * @ author:
 */
export function clearFormAddressData() {
  const d = document;
  d.querySelector("section.address form").reset();
}
