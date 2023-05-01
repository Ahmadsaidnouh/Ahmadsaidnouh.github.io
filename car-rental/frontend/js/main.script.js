"use strict"
const pickUpHeader = document.getElementById("pickUpHeader");
const dropOffHeader = document.getElementById("dropOffHeader");
const editBtn = document.getElementById("editBtn");
const clearFilterBtn1 = document.getElementById("clearFilterBtn1");
const automaticCheckbox1 = document.getElementById("automaticCheckbox1");
const manualCheckbox1 = document.getElementById("manualCheckbox1");
const smallCheckbox1 = document.getElementById("smallCheckbox1");
const mediumCheckbox1 = document.getElementById("mediumCheckbox1");
const largeCheckbox1 = document.getElementById("largeCheckbox1");
const premiumCheckbox1 = document.getElementById("premiumCheckbox1");
const searchResult = document.getElementById("searchResult");
const clearFilterBtnS = document.getElementById("clearFilterBtnS");
const automaticCheckboxS = document.getElementById("automaticCheckboxS");
const manualCheckboxS = document.getElementById("manualCheckboxS");
const smallCheckboxS = document.getElementById("smallCheckboxS");
const mediumCheckboxS = document.getElementById("mediumCheckboxS");
const largeCheckboxS = document.getElementById("largeCheckboxS");
const premiumCheckboxS = document.getElementById("premiumCheckboxS");
const carsContainer = document.getElementById("carsContainer");
const bookBtns = document.getElementsByClassName("book-btn");
let allCars = []
let allDisplayingCars = []
let startDate, endDate, pickLoc, dropLoc;

let filterArr = [0, 0, 0, 0, 0, 0]
let filterArrS = [0, 0, 0, 0, 0, 0]

let checksCount = 0;
let checksCountS = 0;

let filters = [automaticCheckbox1, manualCheckbox1, smallCheckbox1, mediumCheckbox1, largeCheckbox1, premiumCheckbox1]
let filtersS = [automaticCheckboxS, manualCheckboxS, smallCheckboxS, mediumCheckboxS, largeCheckboxS, premiumCheckboxS]

filters.forEach((filter, i) =>
{
    filter.addEventListener("click", (e) =>
    {
        if (e.target.checked) {
            checksCount++;
            filterArr[i] = 1;
            allDisplayingCars = [];
            allCars.forEach((car) =>
            {
                if (filterArr[0] == 1 && car.transmission == 'automatic')
                    allDisplayingCars.push(car)
                if (filterArr[1] == 1 && car.transmission == 'manual')
                    allDisplayingCars.push(car)
                if (filterArr[2] == 1 && car.category == 'Small')
                    allDisplayingCars.push(car)
                if (filterArr[3] == 1 && car.category == 'Medium')
                    allDisplayingCars.push(car)
                if (filterArr[4] == 1 && car.category == 'Large')
                    allDisplayingCars.push(car)
                if (filterArr[5] == 1 && car.category == 'Premium')
                    allDisplayingCars.push(car)
            })
            allDisplayingCars = new Set(allDisplayingCars);
            allDisplayingCars = Array.from(allDisplayingCars);
            displayCars(allDisplayingCars)
        }
        else {
            checksCount--;
            filterArr[i] = 0;
            if (checksCount == 0) {
                allDisplayingCars = []
                displayCars(allCars)
            }
            else {
                allDisplayingCars = [];
                allCars.forEach((car) =>
                {
                    if (filterArr[0] == 1 && car.transmission == 'automatic')
                    allDisplayingCars.push(car)
                if (filterArr[1] == 1 && car.transmission == 'manual')
                    allDisplayingCars.push(car)
                if (filterArr[2] == 1 && car.category == 'Small')
                    allDisplayingCars.push(car)
                if (filterArr[3] == 1 && car.category == 'Medium')
                    allDisplayingCars.push(car)
                if (filterArr[4] == 1 && car.category == 'Large')
                    allDisplayingCars.push(car)
                if (filterArr[5] == 1 && car.category == 'Premium')
                    allDisplayingCars.push(car)
                })
                allDisplayingCars = new Set(allDisplayingCars);
                allDisplayingCars = Array.from(allDisplayingCars);
                displayCars(allDisplayingCars)
            }
        }
    })
})
filtersS.forEach((filter, i) =>
{
    filter.addEventListener("click", (e) =>
    {
        if (e.target.checked) {
            checksCountS++;
            filterArrS[i] = 1;
            allDisplayingCars = [];
            allCars.forEach((car) =>
            {
                if (filterArrS[0] == 1 && car.transmission == 'automatic')
                    allDisplayingCars.push(car)
                if (filterArrS[1] == 1 && car.transmission == 'manual')
                    allDisplayingCars.push(car)
                if (filterArrS[2] == 1 && car.category == 'Small')
                    allDisplayingCars.push(car)
                if (filterArrS[3] == 1 && car.category == 'Medium')
                    allDisplayingCars.push(car)
                if (filterArrS[4] == 1 && car.category == 'Large')
                    allDisplayingCars.push(car)
                if (filterArrS[5] == 1 && car.category == 'Premium')
                    allDisplayingCars.push(car)
            })
            allDisplayingCars = new Set(allDisplayingCars);
            allDisplayingCars = Array.from(allDisplayingCars);
            displayCars(allDisplayingCars)
        }
        else {
            checksCountS--;
            filterArrS[i] = 0;
            if (checksCountS == 0) {
                allDisplayingCars = []
                displayCars(allCars)
            }
            else {
                allDisplayingCars = [];
                allCars.forEach((car) =>
                {
                    if (filterArrS[0] == 1 && car.transmission == 'automatic')
                    allDisplayingCars.push(car)
                if (filterArrS[1] == 1 && car.transmission == 'manual')
                    allDisplayingCars.push(car)
                if (filterArrS[2] == 1 && car.category == 'Small')
                    allDisplayingCars.push(car)
                if (filterArrS[3] == 1 && car.category == 'Medium')
                    allDisplayingCars.push(car)
                if (filterArrS[4] == 1 && car.category == 'Large')
                    allDisplayingCars.push(car)
                if (filterArrS[5] == 1 && car.category == 'Premium')
                    allDisplayingCars.push(car)
                })
                allDisplayingCars = new Set(allDisplayingCars);
                allDisplayingCars = Array.from(allDisplayingCars);
                displayCars(allDisplayingCars)
            }
        }
    })
})

clearFilterBtn1.addEventListener("click", () => {
    filterArr = [0, 0, 0, 0, 0, 0];
    checksCount = 0;
    automaticCheckbox1.checked = false;
    manualCheckbox1.checked = false;
    smallCheckbox1.checked = false;
    mediumCheckbox1.checked = false;
    largeCheckbox1.checked = false;
    premiumCheckbox1.checked = false;
    displayCars(allCars)
})
clearFilterBtnS.addEventListener("click", () => {
    filterArrS = [0, 0, 0, 0, 0, 0];
    checksCountS = 0;
    automaticCheckboxS.checked = false;
    manualCheckboxS.checked = false;
    smallCheckboxS.checked = false;
    mediumCheckboxS.checked = false;
    largeCheckboxS.checked = false;
    premiumCheckboxS.checked = false;
    displayCars(allCars)
})
editBtn.addEventListener('click', () => {
    window.history.go(-1)
})


















function bookCar(car_id)
{

    localStorage.setItem('carId', JSON.stringify(car_id))
    window.location.href = 'book.html'
}

if (localStorage.getItem('specs') != null) {
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

    getAvailableCars(specs);
}

async function getAvailableCars(specs)
{
    let response = await fetch("https://car-rent-backend.vercel.app/", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })

    let finalRes = await response.json();
    allCars = finalRes.data;

    displayCars(allCars)
}

function displayCars(cars)
{
    searchResult.innerHTML = `${pickLoc}: ${cars.length} cars available`
    let date_1 = new Date(startDate);
    let date_2 = new Date(endDate);
    let duration = daysCount(date_2, date_1)
    let cartona = '';

    if (cars.length == 0) {
        carsContainer.innerHTML = '';
        return
    }
    cars.forEach((car) =>
    {
        cartona +=
            `
        <div class="col-12">
        <div class="car border p-3 rounded mb-3">
            <div class="row">
                <div class="col-4">
                    <img class="w-100" src="${car.car_photo}" alt="${car.company + " " + car.model}">
                </div>
                <div class="col-8">
                    <div class="row justify-content-between">
                        <div class="col-lg-6 col-12 d-flex flex-column justify-content-end">
                            <h3>${car.company + " " + car.model}</h3>
                            <div class="d-flex text-muted">
                                <span class="material-symbols-outlined me-1">person</span>
                                ${car.category == 'Large' ? '7' : '5'} seats(${car.category})
                            </div>
                            <div class="d-flex text-muted">
                                <span class="material-symbols-outlined me-1">directions_car</span>
                                ${car.transmission}
                            </div>
                            <div class="mt-3 d-flex text-primary">
                                <p class="mb-0">${car.park_location}-${car.park_city}-${car.country}</p>
                            </div>
                        </div>
                        <div class="price-container col-lg-6 col-12 d-flex flex-column align-items-end justify-content-end">
                            <p class="text-muted mb-0 price-day mb-0">Price for ${duration} days</p>
                            <h3 class="my-0 fw-bold mb-1">$ ${car.rental_charge * duration}</h3>
                            <p class="text-success mb-2">Free cancellation</p>
                            <button class="book-btn btn btn-success w-75"  onclick="bookCar(${car.car_id})">Book now</button>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
        carsContainer.innerHTML = cartona;
    })
}



const daysCount = (date_1, date_2) =>
{
    let difference = date_1.getTime() - date_2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
}

