"use strict"
const pickUpHeader = document.getElementById("pickUpHeader");
const dropOffHeader = document.getElementById("dropOffHeader");
const carContainer = document.getElementById("carContainer");
const emailInput = document.getElementById("emailInput");
const emailAlert = document.getElementById("emailAlert");
const passwordInput = document.getElementById("passwordInput");
const passwordAlert = document.getElementById("passwordAlert");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const successMessage = document.getElementById("successMessage");
const signInContainer = document.getElementById("signInContainer");
const signInBtnContainer = document.getElementById("signInBtnContainer");
const signUpBtnContainer = document.getElementById("signUpBtnContainer");
const notAvailableMessage = document.getElementById("notAvailableMessage");
const editBtn = document.getElementById("editBtn");
let carSpecs;
let startDate, endDate, dropLoc, pickLoc;

if (localStorage.getItem('carId') != null) {
    let carId = JSON.parse(localStorage.getItem('carId'));
    let specs = JSON.parse(localStorage.getItem('specs'));
    startDate = specs.pickDate;
    endDate = specs.dropDate;
    pickLoc = specs.pickLoc;
    dropLoc = specs.dropLoc;

    pickUpHeader.innerHTML =
        `
    <h4>${pickLoc}</h4>               
    <p class="text-muted mb-0">${startDate.split('-').reverse().join('-')}  @11:59AM</p>
                            
    `;
    dropOffHeader.innerHTML =
        `
    <h4>${dropLoc}</h4>               
    <p class="text-muted mb-0">${endDate.split('-').reverse().join('-')}  @11:59PM</p>
                            
    `;

    getCarSpecs(carId, specs)
}
async function getAvailableCars(specs)
{
    let response = await fetch("https://car-rent-backend.vercel.app/", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })

    let finalRes = await response.json();
    let availableCars = finalRes.data;
    let isCarAvailable = false;
    for (let i = 0; i < availableCars.length; i++) {
        if (availableCars[i].car_id == carSpecs[0].car_id) {
            isCarAvailable = true;
            break;
        }
    }
    if (!isCarAvailable) {
        signInContainer.classList.replace("d-block", "d-none");
        notAvailableMessage.classList.replace("d-none", "d-block");
    }
}

async function getCarSpecs(carId, specs)
{
    let response = await fetch(`https://car-rent-backend.vercel.app/getCarSpecs/${carId}`)

    let finalRes = await response.json();
    carSpecs = finalRes.data;

    displayCarSpecs(carSpecs);

    getAvailableCars(specs);
}

function displayCarSpecs(carSpecs)
{
    if (carSpecs.length != 1) {
        carContainer.innerHTML = '';
        return
    }
    carSpecs = carSpecs[0];
    let date_1 = new Date(startDate);
    let date_2 = new Date(endDate);
    let duration = daysCount(date_2, date_1)
    let cartona =
        `
    <div class="row">
    <div class="col-4">
        <img class="w-100" src="${carSpecs.car_photo}">
    </div>
    <div class="col-8">
        <div class="row justify-content-between">
            <div class="col-lg-6 col-12 d-flex flex-column justify-content-end">
                <h3>${carSpecs.company + " " + carSpecs.model}</h3>
                <div class="d-flex text-muted">
                    <span class="material-symbols-outlined me-1">person</span>
                    ${carSpecs.category == 'Large' ? '7' : '5'} seats(${carSpecs.category})
                </div>
                <div class="d-flex text-muted">
                    <span class="material-symbols-outlined me-1">directions_car</span>
                    ${carSpecs.transmission}
                </div>
                <div class="mt-3 d-flex text-primary">
                    <p class="mb-0">${carSpecs.park_location}-${carSpecs.park_city}-${carSpecs.country}</p>
                </div>
            </div>
            <div class="price-container col-lg-6 col-12 d-flex flex-column align-items-end justify-content-end">
                <p class="text-muted mb-0 price-day mb-0">Price for ${duration} days</p>
                <h3 class="my-0 fw-bold mb-1">$ ${carSpecs.rental_charge * duration}</h3>
                <p class="text-success mb-0">Free cancellation</p>
            </div>
        </div>
    </div>
</div>
    `;

    carContainer.innerHTML = cartona;
}

signInBtn.addEventListener("click", () =>
{
    let validInputs = validateSignInForm();
    if (validInputs) {
        getUserId();
    }
})

editBtn.addEventListener('click', () =>
{
    window.history.go(-2)
})

async function getUserId()
{
    let userData = {
        email: emailInput.value,
        password: passwordInput.value
    }
    let response = await fetch("https://car-rent-backend.vercel.app/getUserId", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(userData)
    });
    let finalRes = await response.json();
    let ans = finalRes.data;
    if (ans.length == 1) {
        let userId = ans[0].id;

        let allSpecs = {
            carId: carSpecs[0].car_id,
            userId,
            startDate,
            endDate,
            dropLoc,
            pickLoc: carSpecs[0].park_location + "-" + carSpecs[0].park_city + "-" + carSpecs[0].country,
            carName: carSpecs[0].company + " " + carSpecs[0].model,
            carPlate: carSpecs[0].car_plate
        }
        createReservation(allSpecs);
    }
    else {
        alert("No user with such email and password!")
    }
}



async function createReservation(specs)
{
    let response = await fetch("https://car-rent-backend.vercel.app/createReservation", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })

    let finalRes = await response.json();

    if (finalRes.message == "error")
        alert("Error: can't reserve the same car for the same user at the same date more than once (even if you returned or cancelled the previous reservation)!!")
    else {
        signInBtnContainer.classList.replace("d-block", 'd-none');
        signUpBtnContainer.classList.replace("d-block", 'd-none');
        successMessage.classList.replace("d-none", 'd-block');
    }
}















let isValidEmail = () =>
{
    // let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let zip = emailInput.value;
    return regex.test(zip);
}
let isValidPassword = () =>
{
    let pass = passwordInput.value;
    return (pass.length > 2) ? true : false;
}
function hideAllAlerts()
{
    document.querySelectorAll("#form .alert").forEach((ele) =>
    {
        ele.classList.replace("d-block", "d-none");
    })
}
function displayselectedAlert(index)
{
    Array.from(document.querySelectorAll("#form .alert"))[index].classList.replace("d-none", "d-block");
}
function validateSignInForm()
{
    hideAllAlerts();

    let noAlert = true;
    let validationFunctions = [
        isValidEmail,
        isValidPassword
    ]

    validationFunctions.forEach((isValid, index) =>
    {
        if (!isValid()) {
            noAlert = false;
            displayselectedAlert(index);
        }
    })

    if (!noAlert) {
        return false;
    }
    else {
        return true;
    }
}







const daysCount = (date_1, date_2) =>
{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}