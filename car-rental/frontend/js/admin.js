"use strict"
const reservationsTBody = document.getElementById("reservationsTBody");
const allResStartDateInput = document.getElementById("allResStartDateInput");
const allResEndDateInput = document.getElementById("allResEndDateInput");
const allResBtn = document.getElementById("allResBtn");

const car_reservationsTBody = document.getElementById("car_reservationsTBody");
const car_reservationsCarBody = document.getElementById("car_reservationsCarBody");
const plateId_input = document.getElementById("plateId_input");
const allCarResStartDateInput = document.getElementById("allCarResStartDateInput");
const allCarResEndDateInput = document.getElementById("allCarResEndDateInput");
const allCarResBtn = document.getElementById("allCarResBtn");

const statusTBody = document.getElementById("statusTBody");
const findStatusDateInput = document.getElementById("findStatusDateInput");
const getStatusBtn = document.getElementById("getStatusBtn");


const cust_reservationsTBody = document.getElementById("cust_reservationsTBody");
const cust_reservationsBody = document.getElementById("cust_reservationsBody");
const email_input = document.getElementById("email_input");
const customerResBtn = document.getElementById("customerResBtn");

const paymTBody = document.getElementById("paymTBody");
const payStartInput = document.getElementById("payStartInput");
const payEndInput = document.getElementById("payEndInput");
const paymentBtn = document.getElementById("paymentBtn");


// new
const addCarBtn = document.getElementById("addCarBtn");
const editCarBtn = document.getElementById("editCarBtn");
/*car details*/
const addCar = document.getElementById("addCar");
const carCompany = document.getElementById("carCompany");
const carModel = document.getElementById("carModel");
const carYear = document.getElementById("carYear");
const carCategory = document.getElementById("carCategory");
const carTransmission = document.getElementById("carTransmission");
const carCountry = document.getElementById("carCountry");
const carParkCity = document.getElementById("carParkCity");
const carParkLocation = document.getElementById("carParkLocation");
const carRentalCharge = document.getElementById("carRentalCharge");
const carPhoto = document.getElementById("carPhoto");
const carPlate = document.getElementById("carPlate");
// edit car details
const carEditCountry = document.getElementById("carEditCountry");
const carEditPlate = document.getElementById("carEditPlate");
const carEditStartDate = document.getElementById("carEditStartDate");
const carEditEndDate = document.getElementById("carEditEndDate");
const carEditBtn = document.getElementById("carEditBtn");
// new


$("#reports-btn").click((e) =>
{
    document.getElementById("reports").style.display = "block"
    document.getElementById("addCar").style.display = "none"
    document.getElementById("editCar").style.display = "none"
})

$("#add-car-btn").click((e) =>
{
    document.getElementById("addCar").style.display = "block"
    document.getElementById("reports").style.display = "none"
    document.getElementById("editCar").style.display = "none"
})

$("#edit-car-btn").click((e) =>
{
    document.getElementById("editCar").style.display = "block"
    document.getElementById("addCar").style.display = "none"
    document.getElementById("reports").style.display = "none"
})

$("#car_reservations_nav").click((e) =>
{
    document.getElementById("reservations").style.display = "none"
    document.getElementById("car_reservations").style.display = "block"
    document.getElementById("cars_status").style.display = "none"
    document.getElementById("customer_reservations").style.display = "none"
    document.getElementById("daily_payments").style.display = "none"
})

$("#all_reservations").click((e) =>
{
    document.getElementById("reservations").style.display = "block"
    document.getElementById("car_reservations").style.display = "none"
    document.getElementById("cars_status").style.display = "none"
    document.getElementById("customer_reservations").style.display = "none"
    document.getElementById("daily_payments").style.display = "none"
})

$("#cars_status_nav").click((e) =>
{
    document.getElementById("reservations").style.display = "none"
    document.getElementById("car_reservations").style.display = "none"
    document.getElementById("cars_status").style.display = "block"
    document.getElementById("customer_reservations").style.display = "none"
    document.getElementById("daily_payments").style.display = "none"
})

$("#customer_reservations_nav").click((e) =>
{
    document.getElementById("reservations").style.display = "none"
    document.getElementById("car_reservations").style.display = "none"
    document.getElementById("cars_status").style.display = "none"
    document.getElementById("customer_reservations").style.display = "block"
    document.getElementById("daily_payments").style.display = "none"
})

$("#daily_payments_nav").click((e) =>
{
    document.getElementById("reservations").style.display = "none"
    document.getElementById("car_reservations").style.display = "none"
    document.getElementById("cars_status").style.display = "none"
    document.getElementById("customer_reservations").style.display = "none"
    document.getElementById("daily_payments").style.display = "block"
})








async function getAllReservations()
{
    let specs = {
        startDate: allResStartDateInput.value,
        endDate: allResEndDateInput.value
    };
    let response = await fetch("https://car-rent-backend.vercel.app/getAllReservations", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    });
    let finalRes = await response.json();

    let reservs = finalRes.data;

    let cartona = '';

    for (let i = 0; i < reservs.length; i++) {
        const res = reservs[i];

        cartona += `
        <tr>
            <td>${res.reserv_id}</td>
            <td>${res.reserv_status}</td>
            <td>${res.car_id}</td>
            <td>${res.car_name}</td>
            <td>${res.car_plate}</td>
            <td>${res.start_date}</td>
            <td>${res.end_date}</td>
            <td>${res.payment_date}</td>
            <td>${res.pickup_location}</td>
            <td>${res.pickup_city}</td>
            <td>${res.dropoff_location}</td>
            <td>${res.dropoff_city}</td>
            <td>${res.country}</td>
            <td>${res.payment}</td>
            <td>${res.id}</td>
            <td>${res.email}</td>
            <td>${res.firstName + " " + res.lastName}</td>
            <td>${res.age}</td>
        </tr>
        `

    }
    reservationsTBody.innerHTML = cartona;




}
async function getAllCarReservations()
{
    let specs = {
        carPlate: plateId_input.value,
        startDate: allCarResStartDateInput.value,
        endDate: allCarResEndDateInput.value
    };
    let response = await fetch("https://car-rent-backend.vercel.app/getAllCarReservations", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    });
    let finalRes = await response.json();

    let reservs = finalRes.data;
    let cartona
    if (reservs.length > 0) {
        cartona = `
        <h3>Car id : ${reservs[0].car_id}</h3>
        <h3>Car name : ${reservs[0].car_name}</h3>
        <h3>Car plate : ${reservs[0].car_plate}</h3>
        <h3>Car year : ${reservs[0].year}</h3>
        <h3>Car category : ${reservs[0].category}</h3>
        <h3>Car transmission : ${reservs[0].transmission}</h3>
        <h3>Car rental charge : $ ${reservs[0].rental_charge}</h3>
        <h3>Car photo :  <img class="" src="${reservs[0].car_photo}" alt="car"></h3>
        `;
        car_reservationsCarBody.innerHTML = cartona;
    }
    else {
        cartona = `
        <h3>Car id : --- </h3>
        <h3>Car name : --- </h3>
        <h3>Car plate : --- </h3>
        <h3>Car year : --- </h3>
        <h3>Car category : --- </h3>
        <h3>Car transmission : --- </h3>
        <h3>Car rental charge : --- </h3>
        <h3>Car photo : --- </h3>
        `;
        car_reservationsCarBody.innerHTML = cartona;

    }
    cartona = '';

    for (let i = 0; i < reservs.length; i++) {
        const res = reservs[i];

        cartona += `
        <tr>
            <td >${res.reserv_id}</td>
            <td >${res.reserv_status}</td>
            <td >${res.user_id}</td>
            <td >${res.start_date}</td>
            <td >${res.end_date}</td>
            <td >${res.payment_date}</td>
            <td >${res.pickup_location}</td>
            <td >${res.pickup_city}</td>
            <td >${res.dropoff_location}</td>
            <td >${res.dropoff_city}</td>
            <td >${res.country}</td>
            <td >${res.payment}</td>
        </tr>
        `

    }
    car_reservationsTBody.innerHTML = cartona;

}
async function getAllStatus()
{

    let startDate = findStatusDateInput.value;
    let response = await fetch(`https://car-rent-backend.vercel.app/getCarStatus/${startDate}`);
    let finalRes = await response.json();

    let statuses = finalRes.finalANs;
    let cartona = '';
    for (let i = 0; i < statuses.length; i++) {
        const res = statuses[i];

        cartona += `
        <tr>
            <td >${res.car_plate}</td>
            <td >${res.status}</td>
        </tr>
        `

    }
    statusTBody.innerHTML = cartona;
}
async function getAllCustReservations()
{
    let email = email_input.value;
    let response = await fetch(`https://car-rent-backend.vercel.app/getAllUserReservations/${email}`);
    let finalRes = await response.json();
    let reservs = finalRes.data;
    let cartona
    if (reservs.length > 0) {
        cartona = `
        <h3>Email : ${reservs[0].email}</h3>
        <h3>First Name : ${reservs[0].firstName}</h3>
        <h3>Last Name : ${reservs[0].lastName}</h3>
        <h3>Gender : ${reservs[0].gender}</h3>
        <h3>Age : ${reservs[0].age}</h3>
        <h3>Phone : ${reservs[0].phone}</h3>
        <h3>Country : ${reservs[0].country}</h3>
        <h3>Balance :  ${reservs[0].balance}</h3>
        `;
        cust_reservationsBody.innerHTML = cartona;
    }
    else {
        cartona = `
        <h3>Email : ---</h3>
        <h3>First Name : ---</h3>
        <h3>Last Name : ---</h3>
        <h3>Gender : ---</h3>
        <h3>Age : ---</h3>
        <h3>Phone : ---</h3>
        <h3>Country : ---</h3>
        <h3>Balance :  ---</h3>
        `;
        cust_reservationsBody.innerHTML = cartona;

    }
    cartona = '';

    for (let i = 0; i < reservs.length; i++) {
        const res = reservs[i];

        cartona += `
        <tr>
            <td >${res.reserv_id}</td>
            <td >${res.car_plate}</td>
            <td >${res.car_name}</td>
        </tr>
        `

    }
    cust_reservationsTBody.innerHTML = cartona;
}
async function getDailyPayments()
{

    let specs = {
        startDate: payStartInput.value,
        endDate: payEndInput.value
    };
    let response = await fetch("https://car-rent-backend.vercel.app/getDailyPayments", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    });
    let finalRes = await response.json();

    let reservs = finalRes.data;
    let cartona = '';

    for (let i = 0; i < reservs.length; i++) {
        const res = reservs[i];

        cartona += `
        <tr>
            <td >${res.date_pay}</td>
            <td >${res.balance}</td>
        </tr>
        `

    }
    paymTBody.innerHTML = cartona;




}

allResBtn.addEventListener('click', getAllReservations)
allCarResBtn.addEventListener('click', getAllCarReservations)
getStatusBtn.addEventListener('click', getAllStatus)
customerResBtn.addEventListener('click', getAllCustReservations)
paymentBtn.addEventListener('click', getDailyPayments)















let validCompany = false;
let validCategory = false;
let validModel = false;
let validParkCity = false;
let validParkLocation = false;
let validPhoto = false;
let validPlate = false;
let validRentalCharge = false;
let validYear = false;

let validEditCountry = false;
let validEditPlate = false;
let validEditStartDate = false;
let validEditEndDate = false;

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let currentDate = `${year}-${month}-${day}`;

let isValidCompany = () =>
{
    let company = carCompany.value;
    return (company.length > 2) ? true : false;
}
let isValidModel = () =>
{
    let model = carModel.value;
    return (model.length > 2) ? true : false;
}

let isValidYear = () =>
{
    let year = carYear.value;
    return (year > 2) ? true : false;
}
let isValidCategory = () =>
{
    let category = carCategory.value;
    return (category.length > 5) ? true : false;
}


let isValidParkCity = () =>
{
    let parkCity = carParkCity.value;
    return (parkCity.length > 2) ? true : false;
}
let isValidParkLocation = () =>
{
    let parkLocation = carParkLocation.value;
    return (parkLocation.length > 2) ? true : false;
}
let isValidRentalCharge = () =>
{
    let rentalCharge = carRentalCharge.value;
    return (rentalCharge > 0) ? true : false;
}
let isValidPhoto = () =>
{
    let photo = carPhoto.value;
    return (photo.length > 2) ? true : false;
}

let isValidPlate = () =>
{
    let plate = carPlate.value;
    return (plate.length > 2) ? true : false;
}

let isValidEditCountry = () =>
{
    let country = carEditCountry.value;
    return (country.length > 2) ? true : false;
}
let isValidEditPlate = () =>
{
    let plate = carEditPlate.value;
    return (plate.length > 2) ? true : false;
}


carCategory.addEventListener("blur", () =>
{
    validCategory = isValidCategory()
    carInputChecker()

})
carCompany.addEventListener("blur", () =>
{
    validCompany = isValidCompany()
    carInputChecker()
})
carModel.addEventListener("blur", () =>
{
    validModel = isValidModel()
    carInputChecker()
})
carParkCity.addEventListener("blur", () =>
{
    validParkCity = isValidParkCity
    carInputChecker()
})
carParkLocation.addEventListener("blur", () =>
{
    validParkLocation = isValidParkLocation()
    carInputChecker()
})
carPhoto.addEventListener("blur", () =>
{
    validPhoto = isValidPhoto()
    carInputChecker()
})
carPlate.addEventListener("blur", () =>
{
    validPlate = isValidPlate()
    carInputChecker()
})
carRentalCharge.addEventListener("blur", () =>
{
    validRentalCharge = isValidRentalCharge()
    carInputChecker()
})
carYear.addEventListener("blur", () =>
{
    validYear = isValidYear()
    carInputChecker()
})
carEditCountry.addEventListener("blur", () =>
{
    validEditCountry = isValidEditCountry()
})
carEditPlate.addEventListener("blur", () =>
{
    validEditPlate = isValidEditPlate()
})

addCarBtn.addEventListener("click", () =>
{

    let car = {
        country: carCountry.value.toLowerCase(),
        company: carCompany.value,
        category: carCategory.value,
        model: carModel.value,
        parkCity: carParkCity.value.toLowerCase(),
        parkLocation: carParkLocation.value.toLowerCase(),
        photo: carPhoto.value,
        plate: carPlate.value,
        rentalCharge: carRentalCharge.value,
        year: carYear.value,
        transmission: carTransmission.value.toLowerCase()
    }
    addCarToDB(car)

})
async function addCarToDB(car)
{
    let response = await fetch("https://car-rent-backend.vercel.app/addCar", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(car)
    })

    let finalRes = await response.json();

    if (finalRes.message == 'error')
        alert("Error: this car already registered.\nPlease try again.");
    else {
        alert("Car added successfully");
    }
}
function carInputChecker()
{
    let isValidCarInput = validCategory && validModel && validParkCity && validParkLocation && validPhoto && validPlate && validRentalCharge && validYear
    if (isValidCarInput) {
        addCarBtn.disabled = false
    }
}
editCarBtn.addEventListener("click", () =>
{
    if (validEditCountry && validEditPlate && carEditStartDate.value >= currentDate && carEditEndDate.value > carEditStartDate.value) {
        let carEdit = {
            car_plate: carEditPlate.value,
            country: carEditCountry.value.toLowerCase(),
            startDate: carEditStartDate.value,
            endDate: carEditEndDate.value
        }
        editCarToDB(carEdit)
    }
    else {
        alert("Please fill all fields correctly")
    }
})
async function editCarToDB(car)
{
    let specs = {
        dropDate: car.endDate,
        pickDate: car.startDate
    };
    let response = await fetch("https://car-rent-backend.vercel.app/getAvailableCars1", {
        method: 'POST',
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(specs)
    })

    let finalRes = await response.json();
    let allCars = finalRes.data;
    let isCarAvailable = false;
    allCars.forEach(ele =>
    {
        if (ele.car_plate == car.car_plate && ele.country == car.country) {
            car.car_id = ele.car_id
            isCarAvailable = true;
            return;
        }
    });
    if (isCarAvailable) {


        let res = await fetch("https://car-rent-backend.vercel.app/editCar", {
            method: 'POST',
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(car)
        })
        let finalRes = await res.json();
        if (finalRes.message == 'error')
            alert("Error: this car already reserved or doesn't exist.\nPlease try again.");
        else {
            alert("Car edited successfully");
        }
    }
    else {
        alert("Error: can't set car out of service because either car is already not available at the specified duration or no car with such car plate.")
    }
}