"use strict"
const signInContainer = document.getElementById("signInContainer");
const userInfoContainer = document.getElementById("userInfoContainer");
const reservsContainer = document.getElementById("reservsContainer");
const popup = document.getElementById("popup");
const emailInput = document.getElementById("emailInput");
const emailAlert = document.getElementById("emailAlert");
const passwordInput = document.getElementById("passwordInput");
const passwordAlert = document.getElementById("passwordAlert");
const signInBtn = document.getElementById("signInBtn");
const signUpBtn = document.getElementById("signUpBtn");
const signUpBtnContainer = document.getElementById("signUpBtnContainer");
const statusContainer = document.getElementById("statusContainer");
const returnedReservBtn = document.getElementById("returnedReservBtn");
const pickedReservBtn = document.getElementById("pickedReservBtn");
const notPickedReservBtn = document.getElementById("notPickedReservBtn");
const allReservBtn = document.getElementById("allReservBtn");
const cancelledReservBtn = document.getElementById("cancelledReservBtn");
const signOutNav = document.getElementById("signOutNav");
const homeNav = document.getElementById("homeNav");
let activeStatusIndex = 1;




let displayAll = () =>
{
    assignActiveStatus(1)
    displayUserReservs(userReservs, 1)
}
let displayNotPicked = () =>
{
    let temp = [];
    for (let i = 0; i < userReservs.length; i++) {
        if (userReservs[i].reserv_status == 'not-picked')
            temp.push(userReservs[i])
    }
    assignActiveStatus(2)
    displayUserReservs(temp, 2)
}
let displayPicked = () =>
{
    let temp = [];
    for (let i = 0; i < userReservs.length; i++) {
        if (userReservs[i].reserv_status == 'picked')
            temp.push(userReservs[i])
    }
    assignActiveStatus(3)
    displayUserReservs(temp, 2)
}
let displayReturned = () =>
{
    let temp = [];
    for (let i = 0; i < userReservs.length; i++) {
        if (userReservs[i].reserv_status == 'ended')
            temp.push(userReservs[i])
    }
    assignActiveStatus(4)
    displayUserReservs(temp, 2)
}
let displayCancelled = () =>
{
    let temp = [];
    for (let i = 0; i < userReservs.length; i++) {
        if (userReservs[i].reserv_status == 'cancelled')
            temp.push(userReservs[i])
    }
    assignActiveStatus(5)
    displayUserReservs(temp, 2)
}
allReservBtn.addEventListener('click', displayAll)
notPickedReservBtn.addEventListener('click', displayNotPicked);
pickedReservBtn.addEventListener('click', displayPicked);
returnedReservBtn.addEventListener('click', displayReturned);
cancelledReservBtn.addEventListener('click', displayCancelled);

function displayCurrentStatus()
{
    if (activeStatusIndex == 1) {
        displayAll()
    }
    else if (activeStatusIndex == 2) {
        displayNotPicked()
    }
    else if (activeStatusIndex == 3) {
        displayPicked()
    }
    else if (activeStatusIndex == 4) {
        displayReturned()
    }
    else {
        displayCancelled()
    }
}


let selectedReserv;
let userReservs = [];

signInBtn.addEventListener("click", () =>
{
    let validInputs = validateSignInForm();
    if (validInputs) {
        signOutNav.classList.replace('d-none', 'd-block')
        homeNav.classList.replace('d-block', 'd-none')
        getUserId();

    }
})

let closePopup = () =>
{
    popup.classList.replace("d-block", 'd-none');
}

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
    })

    let finalRes = await response.json();
    let ans = finalRes.data;
    if (ans.length == 1) {
        let userId = ans[0].id;
        let firstName = ans[0].firstName;
        let lastName = ans[0].lastName;

        signInContainer.classList.replace("d-block", 'd-none');
        let cartona = `
        <div class="confirm-info border rounded p-3">
        <h2>Name: <span class="text-muted">${firstName + " " + lastName}</span></h2>
        <h2>Email: <span class="text-muted">${emailInput.value}</span></h2>
        </div>
        `
        userInfoContainer.innerHTML = cartona;
        userInfoContainer.classList.replace("d-none", 'd-block');


        getUserReservs(userId);
    }
    else {
        alert("No user with such email and password!")
    }
}

async function getUserReservs(userId)
{
    let response = await fetch(`https://car-rent-backend.vercel.app/getUserReservs/${userId}`);

    let finalRes = await response.json();

    if (finalRes.message == "error")
        alert("No user with such email and password!")
    else {

        reservsContainer.classList.replace("d-none", 'd-block');
        statusContainer.classList.replace("d-none", 'd-block');
        userReservs = finalRes.data
        assignActiveStatus(1)
        displayUserReservs(userReservs, 1)
    }
}



function displayUserReservs(reservs, messageType)
{
    // reservs.sort((a, b) => (a.start_date > b.start_date ? 1 : -1))
    let cartona = '';
    if (reservs.length == 0) {
        if (messageType == 1)
            reservsContainer.innerHTML = '<div class="booking rounded border p-3 mb-4"><h4>No bookings yet.</h4></div>';
        else
            reservsContainer.innerHTML = '<div class="booking rounded border p-3 mb-4"><h4>No bookings with such type exists.</h4></div>';
        return
    }
    reservs.forEach((res) =>
    {
        if (res.reserv_status == "not-picked")
            cartona +=
                `
                <div class="booking rounded border p-3 mb-4">
                <div class="row">
                    <div class="col-12 border-bottom">
                        <h5 class="mb-2">Reservation number: <span class="ms-2 text-muted">${res.reserv_id}</span></h5>
                        <h5 class="mb-2">Car plate number: <span class="ms-2 text-muted">${res.car_plate}</span></h5>
                        <h5 class="mb-2">Car name: <span class="ms-2 text-muted">${res.car_name}</span></h5>
                        <h5 class="mb-2">Start-date: <span class="ms-2 text-muted">${res.start_date}</span></h5>
                        <h5 class="mb-2">End-date: <span class="ms-2 text-muted">${res.end_date}</span></h5>
                        <h5 class="mb-2">Pickup location: <span class="ms-2 text-muted">${res.pickup_location + '-' + res.pickup_city + '-' + res.country}</span></h5>
                        <h5 class="mb-3">Dropoff location: <span class="ms-2 text-muted">${res.dropoff_location + '-' + res.dropoff_city + '-' + res.country}</span></h5>
                    </div>
                    <div class="col-12">
                        <div class="mt-3 d-flex justify-content-between align-items-center">
                            <h5>Status: <span class="ms-1 text-muted">Not picked</span></h5>
                            <div>
                                <button class="rounded btn btn-primary me-2"  onclick="pickUpReserv(${res.reserv_id})">Pick-up</button>
                                <button class="rounded btn btn-danger"  onclick="cancelReserv(${res.reserv_id})">Cancel booking</button>
                            </div>
                        </div>
                        <div class="d-none mt-1 alert alert-danger p-2">
                            Can't pickup before starting date.
                        </div>
                    </div>
                </div>
            </div>
        `
        else if (res.reserv_status == "picked")
            cartona +=
                `
                <div class="booking rounded border p-3 mb-4">
                <div class="row">
                    <div class="col-12 border-bottom">
                    <h5 class="mb-2">Reservation number: <span class="ms-2 text-muted">${res.reserv_id}</span></h5>
                    <h5 class="mb-2">Car plate number: <span class="ms-2 text-muted">${res.car_plate}</span></h5>
                    <h5 class="mb-2">Car name: <span class="ms-2 text-muted">${res.car_name}</span></h5>
                    <h5 class="mb-2">Start-date: <span class="ms-2 text-muted">${res.start_date}</span></h5>
                    <h5 class="mb-2">End-date: <span class="ms-2 text-muted">${res.end_date}</span></h5>
                    <h5 class="mb-2">Pickup location: <span class="ms-2 text-muted">${res.pickup_location + '-' + res.pickup_city + '-' + res.country}</span></h5>
                    <h5 class="mb-3">Dropoff location: <span class="ms-2 text-muted">${res.dropoff_location + '-' + res.dropoff_city + '-' + res.country}</span></h5>
                    </div>
                    <div class="col-12">
                        <div class="mt-3 d-flex justify-content-between align-items-center">
                            <h5>Status: <span class="ms-1 text-muted">Picked up</span></h5>
                            <button class="rounded btn btn-primary"   onclick="returnReserv(${res.reserv_id})">Return</button>
                        </div>
                    </div>
                </div>
            </div>
        `
        else if (res.reserv_status == "cancelled")
            cartona +=
                `
                <div class="booking rounded border p-3 mb-4">
                <div class="row">
                    <div class="col-12 border-bottom">
                    <h5 class="mb-2">Reservation number: <span class="ms-2 text-muted">${res.reserv_id}</span></h5>
                    <h5 class="mb-2">Car plate number: <span class="ms-2 text-muted">${res.car_plate}</span></h5>
                    <h5 class="mb-2">Car name: <span class="ms-2 text-muted">${res.car_name}</span></h5>
                    <h5 class="mb-2">Start-date: <span class="ms-2 text-muted">${res.start_date}</span></h5>
                    <h5 class="mb-2">End-date: <span class="ms-2 text-muted">${res.end_date}</span></h5>
                    <h5 class="mb-2">Pickup location: <span class="ms-2 text-muted">${res.pickup_location + '-' + res.pickup_city + '-' + res.country}</span></h5>
                    <h5 class="mb-3">Dropoff location: <span class="ms-2 text-muted">${res.dropoff_location + '-' + res.dropoff_city + '-' + res.country}</span></h5>
                        </div>
                    <div class="col-12">
                        <div class="mt-3 d-flex justify-content-between">
                            <h5>Status: <span class="ms-2 text-muted">Cancelled</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        `
        else
            cartona +=
                `
                <div class="booking rounded border p-3 mb-4">
                <div class="row">
                    <div class="col-12 border-bottom">
                    <h5 class="mb-2">Reservation number: <span class="ms-2 text-muted">${res.reserv_id}</span></h5>
                    <h5 class="mb-2">Car plate number: <span class="ms-2 text-muted">${res.car_plate}</span></h5>
                    <h5 class="mb-2">Car name: <span class="ms-2 text-muted">${res.car_name}</span></h5>
                    <h5 class="mb-2">Start-date: <span class="ms-2 text-muted">${res.start_date}</span></h5>
                    <h5 class="mb-2">Expected-end-date: <span class="ms-2 text-muted">${res.end_date}</span></h5>
                    <h5 class="mb-2">Return-date: <span class="ms-2 text-muted">${res.payment_date}</span></h5>
                    <h5 class="mb-2">Pickup location: <span class="ms-2 text-muted">${res.pickup_location + '-' + res.pickup_city + '-' + res.country}</span></h5>
                    <h5 class="mb-2">Dropoff location: <span class="ms-2 text-muted">${res.dropoff_location + '-' + res.dropoff_city + '-' + res.country}</span></h5>
                    <h5 class="mb-3">Total payment: <span class="ms-2 text-muted">$ ${res.payment}</span></h5>
                    </div>
                    <div class="col-12">
                        <div class="mt-3 d-flex justify-content-between">
                            <h5>Status: <span class="ms-2 text-muted">Returned</span></h5>
                        </div>
                    </div>
                </div>
            </div>
        `

    })
    reservsContainer.innerHTML = cartona;
}

async function pickUpReserv(reservId)
{

    let errorMessage = event.target.parentElement.parentElement.nextElementSibling;
    errorMessage.classList.replace("d-block", "d-none");

    selectedReserv = getSelectedReservDetails(reservId)
    let startDate = selectedReserv.start_date;
    let currentDate = getCurrentDate();
    if (currentDate < startDate) {
        errorMessage.classList.replace("d-none", "d-block");
    }
    else {
        let response = await fetch(`https://car-rent-backend.vercel.app/pickReservation/${reservId}`);

        let finalRes = await response.json();

        if (finalRes.message == "error")
            alert("Error while picking reservation!")
        else {
            for (let i = 0; i < userReservs.length; i++) {
                if (userReservs[i].reserv_id == reservId)
                    userReservs[i].reserv_status = 'picked'
            }
            displayCurrentStatus()
        }
    }
}
async function cancelReserv(reservId)
{
    let errorMessage = event.target.parentElement.parentElement.nextElementSibling;
    errorMessage.classList.replace("d-block", "d-none");


    let confirmCancel = confirm("Are you sure you want to cancel?");

    if (confirmCancel == true) {

        selectedReserv = getSelectedReservDetails(reservId)
        let response = await fetch(`https://car-rent-backend.vercel.app/cancelReservation/${reservId}`);

        let finalRes = await response.json();

        if (finalRes.message == "error")
            alert("Error while cancelling reservation!")
        else {
            for (let i = 0; i < userReservs.length; i++) {
                if (userReservs[i].reserv_id == reservId)
                    userReservs[i].reserv_status = 'cancelled'
            }
            displayCurrentStatus()
        }
    }
}
async function returnReserv(reservId)
{
    selectedReserv = getSelectedReservDetails(reservId);
    let specs = {
        carId: selectedReserv.car_id,
        startDate: selectedReserv.start_date,
        endDate: selectedReserv.end_date,
        currentDate: getCurrentDate()
    }
    let response = await fetch("https://car-rent-backend.vercel.app/getTotalPayment", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })
    let finalRes = await response.json();
    let totalPayment = finalRes.totalPayment;
    if (finalRes.message == "error") {
        alert("Error while ending reservation!")
    }
    else {
        let currentDate = getCurrentDate();
        let cartona = `
        <div class="container">
            <div class="row bg-white p-3 rounded position-relative">
                <div id="closePopupBtn" onclick="closePopup()" class="position-absolute rounded d-flex justify-content-center align-items-center cursor-pointer">
                    <span class="material-symbols-outlined">
                        close
                        </span>
                </div>
                <div class="col-12 border-bottom px-0 px-lg-2">
                    <h5 class="mb-2">Reservation number: <span class="ms-2 text-muted">${selectedReserv.reserv_id}</span></h4>
                    <h5 class="mb-2">Car plate: <span class="ms-2 text-muted">${selectedReserv.car_plate}</span></h4>
                    <h5 class="mb-2">Car name: <span class="ms-2 text-muted">${selectedReserv.car_name}</span></h4>
                    <h5 class="mb-2">Start-date: <span class="ms-2 text-muted">${selectedReserv.start_date}</span></h4>
                    <h5 class="mb-2">Expected-end-date: <span class="ms-2 text-muted">${selectedReserv.end_date}</span></h5>
                    <h5 class="mb-2">Current-date: <span class="ms-2 text-muted">${currentDate}</span></h5>
                    <h5 class="mb-3">Total charge: <span class="ms-2 text-muted">$ ${totalPayment}</span></h4>
                </div>
                <div class="col-12 px-0 px-lg-2">
                    <div class="mt-3 d-flex justify-content-center">
                        <button class="rounded btn btn-primary" onclick="payReservation('${selectedReserv.dropoff_location}','${selectedReserv.dropoff_city}','${selectedReserv.country}',${totalPayment},'${currentDate}',${selectedReserv.reserv_id},${selectedReserv.user_id},${selectedReserv.car_id})">Pay</button>
                        <!-- <h4>Status: <span class="ms-1 text-muted">Not picked</span></h4> -->
                    </div>
                    <div class="d-none mt-1 alert alert-danger p-2 d-flex justify-content-between align-items-center">
                        No enough balance!!
                        <button class="rounded btn btn-success ms-auto" onclick="recharge(${selectedReserv.user_id})">Recharge</button>
                    </div>
                </div>
            </div>
        </div>
        `
        popup.innerHTML = cartona;
        popup.classList.replace('d-none', 'd-block');
    }
}

async function payReservation(location, city, country, totalPayment, currentDate, reservId, userId, carId)
{
    let recharge = event.target.parentElement.nextElementSibling;
    recharge.classList.replace("d-block", "d-none");
    let specs = { location, city, country, totalPayment, currentDate, reservId, userId, carId };
    let response = await fetch("https://car-rent-backend.vercel.app/payment", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })
    let finalRes = await response.json();
    if (finalRes.message == 'done') {
        alert('Payment completed successfully');

        for (let i = 0; i < userReservs.length; i++) {
            if (userReservs[i].reserv_id == reservId)
                userReservs[i].reserv_status = 'ended';
            userReservs[i].payment_date = currentDate;
            userReservs[i].payment = totalPayment;
        }
        displayCurrentStatus()
        popup.classList.replace('d-block', 'd-none');
    }
    else {
        recharge.classList.replace("d-none", "d-block");
    }
}

async function recharge(userId)
{
    let recharge = event.target.parentElement;
    let ans = prompt('Enter amount to add to your balance:');
    let addition = Number(ans);
    if (ans == null) {

    }
    else if (isNaN(addition) || addition <= 0) {
        alert('Error: invalid recharging amount! Please make sure to recharge with positive amount!')
    }
    else {
        let specs = { addition, userId };
        let response = await fetch("https://car-rent-backend.vercel.app/rechargeBalance", {
            method: 'POST',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(specs)
        })
        let finalRes = await response.json();
        alert('Recharging completed successfully');

    }
    recharge.classList.replace("d-block", "d-none");

}

function getSelectedReservDetails(reservId)
{
    let ans;

    userReservs.forEach((res) =>
    {
        if (res.reserv_id == reservId) {
            ans = res
            return;
        }
    })
    return ans;
}

function assignActiveStatus(index)
{
    allReservBtn.classList.remove('active-status');
    notPickedReservBtn.classList.remove('active-status');
    pickedReservBtn.classList.remove('active-status');
    returnedReservBtn.classList.remove('active-status');
    cancelledReservBtn.classList.remove('active-status');
    activeStatusIndex = index;

    if (index == 1)
        allReservBtn.classList.add('active-status');
    else if (index == 2)
        notPickedReservBtn.classList.add('active-status');
    else if (index == 3)
        pickedReservBtn.classList.add('active-status');
    else if (index == 4)
        returnedReservBtn.classList.add('active-status');
    else if (index == 5)
        cancelledReservBtn.classList.add('active-status');

}






// let date_1 = new Date(startDate);
// let date_2 = new Date(endDate);
// let duration = daysCount(date_2, date_1)
function getCurrentDate()
{
    let date = new Date();
    let currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return currentDate;
}
const daysCount = (date_1, date_2) =>
{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}
















let isValidEmail = () =>
{
    // let regex = /^[a-z0-9.-]+@[a-z]+\.[a-z]{2,3}/;
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
