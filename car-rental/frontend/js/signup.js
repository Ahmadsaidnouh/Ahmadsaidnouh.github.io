"use strict"
const warningMsg = document.getElementById("warningMsg");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const registEmail = document.getElementById("emailInput");
const registPassword = document.getElementById("passwordInput");
const confirmPass = document.getElementById("confirmPassword");
const countryInput = document.getElementById("countryInput");
const gridRadios1 = document.getElementById("gridRadios1");
const gridRadios2 = document.getElementById("gridRadios2");
const balance = document.getElementById("balance");
const phoneNumber = document.getElementById("phoneNumber");
const mainButton = document.getElementById("signUpBtn");
const signUpBtnContainer = document.getElementById("signUpBtnContainer");
const age = document.getElementById("age");
var confirmIsValid = false;
var nameIsValid = false;
var emailIsValid = false;
var ageIsValid = false;
var passIsValid = true;
// var passIsValid = false;
var balanceIsValid = false;

mainButton.setAttribute('disabled', 'disabled');
firstName.addEventListener("blur", validUserFirstNameRegister);
lastName.addEventListener("blur", validUserLastNameRegister);
registEmail.addEventListener("blur", validUserEmailRegister);
age.addEventListener("blur", validAge);
// registPassword.addEventListener("blur", validUserPasswordRegister);
confirmPass.addEventListener("blur", confirmPassword);
balance.addEventListener("blur", validBalance);

mainButton.addEventListener("click", () =>
{
    let gender = getGender();
    if (gender == false) {
        alert("Error: must enter gender.")
    }
    else {
        let data = {
            email: registEmail.value,
            firstName: firstName.value,
            lastName: lastName.value,
            gender,
            phone: phoneNumber.value,
            country: countryInput.value.toLowerCase(),
            balance: Number(balance.value),
            password: passwordInput.value,
            age: Number(age.value)
        }
        addUser(data)
    }
})

async function addUser(specs)
{
    let response = await fetch("https://car-rent-backend.vercel.app/addUser", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })

    let finalRes = await response.json();

    if (finalRes.message == 'error')
        alert("Error: this email already taken.\nChoose another email.");
    else {
        signUpBtnContainer.innerHTML = `
        <h4 class="text-success">Signed up successfully</h4>
        <a href="index.html" class="btn btn-primary w-100 mx-auto rounded">Home</a>
        `
    }
}

function getGender()
{
    if (gridRadios1.checked)
        return 'male'

    else if (gridRadios2.checked)
        return 'female'

    return false;

}

function validAge()
{
    // var regexUserName = /^[A-Z][a-z0-9]{2,}$/;
    if (Number(age.value) >= 18) {
        age.classList.add("is-valid");
        age.classList.remove("is-invalid");
        warningMsg.style.display = "none";
        ageIsValid = true;

    } else {
        age.classList.add("is-invalid");
        age.classList.remove("is-valid");
        warningMsg.innerHTML = "User must be at least 18 years old";
        warningMsg.style.display = "inline";
        ageIsValid = false;

    }
    checkButtonAbility()

}
function validUserFirstNameRegister()
{
    var regexUserName = /^([A-Z][a-z0-9]{2,}( ){0,1}){1,}$/;
    // var regexUserName = /^[A-Z][a-z0-9 ]{2,}$/;
    if (regexUserName.test(firstName.value) == true) {
        firstName.classList.add("is-valid");
        firstName.classList.remove("is-invalid");
        warningMsg.style.display = "none";
        nameIsValid = true;

    } else {
        firstName.classList.add("is-invalid");
        firstName.classList.remove("is-valid");
        warningMsg.innerHTML = "Name must begin by A-Z and at least 3 letters";
        warningMsg.style.display = "inline";
        nameIsValid = false;

    }
    checkButtonAbility()

}
function validUserLastNameRegister()
{
    var regexUserName = /^([A-Z][a-z0-9]{2,}( ){0,1}){1,}$/;
    if (regexUserName.test(lastName.value) == true) {
        lastName.classList.add("is-valid");
        lastName.classList.remove("is-invalid");
        warningMsg.style.display = "none";
        nameIsValid = true;

    } else {
        lastName.classList.add("is-invalid");
        lastName.classList.remove("is-valid");
        warningMsg.innerHTML = "Name must begin by A-Z and at least 3 letters";
        warningMsg.style.display = "inline";
        nameIsValid = false;

    }
    checkButtonAbility()

}

function validUserEmailRegister()
{
    var regexUserEmail = /^([A-Z]|[a-z]|[1-9]){1,}@[a-z]{1,}\./;
    if (regexUserEmail.test(registEmail.value) == true) {
        registEmail.classList.add("is-valid");
        registEmail.classList.remove("is-invalid");
        warningMsg.style.display = "none";
        emailIsValid = true;

    } else {
        registEmail.classList.add("is-invalid");
        registEmail.classList.remove("is-valid");
        warningMsg.innerHTML = "invalid Email";
        warningMsg.style.display = "inline";
        emailIsValid = false;

    }
    checkButtonAbility()
}


// function validUserPasswordRegister() {
//     var regexUserPassword = /^([A-Z]|[a-z]|[1-9]){1,}/;
//     if ((regexUserPassword.test(registPassword.value) == true) && (registPassword.value.length >= 8)) {
//         registPassword.classList.add("is-valid");
//         registPassword.classList.remove("is-invalid");
//         warningMsg.style.display = "none";
//         passIsValid = true;
//     } else {
//         registPassword.classList.add("is-invalid");
//         registPassword.classList.remove("is-valid");
//         warningMsg.innerHTML = "Password must contain upper case , lower case and 8 characters minimum";
//         warningMsg.style.display = "inline";
//         passIsValid = false;
//     }
//     checkButtonAbility()
// }

function confirmPassword()
{

    if (confirmPass.value == registPassword.value) {
        confirmPass.classList.add("is-valid");
        confirmPass.classList.remove("is-invalid");
        confirmIsValid = true;
        warningMsg.style.display = "none";

    } else {
        confirmPass.classList.add("is-invalid");
        confirmPass.classList.remove("is-valid");
        warningMsg.innerHTML = "Different Passwords";
        warningMsg.style.display = "inline";
        confirmIsValid = false;
    }
    checkButtonAbility()
}

function validBalance()
{
    if (balance.value != "") {
        balanceIsValid = true;
    } else {
        balanceIsValid = false;
    }
}

function checkButtonAbility()
{
    if (nameIsValid && passIsValid && emailIsValid && confirmIsValid && ageIsValid) {
        mainButton.removeAttribute('disabled');
    } else {

        mainButton.setAttribute('disabled', 'disabled');
    }
}