"use strict"
const pickupInput = document.getElementById("pickupInput");
const dropoffInput = document.getElementById("dropoffInput");
const pickUpDateInput = document.getElementById("pickUpDateInput");
const dropoffDateInput = document.getElementById("dropoffDateInput");
const searchBtn = document.getElementById("searchBtn");
const dropoffCheckbox = document.getElementById("dropoffCheckbox");
const dropOffSection = document.getElementById("dropOffSection");
let isNewDrop;


window.onload = () =>
{
    isNewDrop = dropoffCheckbox.checked;
    dropOffSection.classList.replace(isNewDrop ? 'd-none' : 'd-block', isNewDrop ? 'd-block' : 'd-none')
}

dropoffCheckbox.addEventListener("click", () =>
{
    isNewDrop = dropoffCheckbox.checked;
    dropOffSection.classList.replace(isNewDrop ? 'd-none' : 'd-block', isNewDrop ? 'd-block' : 'd-none')
})

searchBtn.addEventListener("click", () =>
{
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    let currentDate = `${year}-${month/10 < 1 ? ('0'+month) : month}-${day/10 < 1 ? ('0'+day) : day}`;


    let pickLoc = pickupInput.value;
    let dropLoc = isNewDrop ? dropoffInput.value : pickLoc;
    let pickDate = pickUpDateInput.value;
    let dropDate = dropoffDateInput.value;

    if (pickLoc == '' || dropLoc == '' || pickDate == '' || dropDate == '')
        alert("Must enter all inputs")
    else if (pickLoc.split('-').length != 3)
        alert("Must enter all pick-up location info (location-city-country)")
    else if (dropLoc.split('-').length != 3)
        alert("Must enter all drop-off location info (location-city-country)")
    else if (pickLoc.split('-')[2] != dropLoc.split('-')[2])
        alert("Must drop the car in the same pick-up country!")
    else if (pickDate < currentDate)
        alert(`Pick date must be after or same as ${currentDate}, ${pickDate}`)
    else if (pickDate >= dropDate)
        alert("Drop date must be after pick date")
    else {
        let temp = dropLoc.split('-');
        for (let i = 0; i < temp.length; i++)
            temp[i] = temp[i].trim().toLowerCase();
        dropLoc = temp.join('-');

        temp = pickLoc.split('-');
        for (let i = 0; i < temp.length; i++)
            temp[i] = temp[i].trim().toLowerCase();
        pickLoc = temp.join('-');


        let specs = { pickLoc, dropLoc, pickDate, dropDate }
        localStorage.setItem("specs", JSON.stringify(specs));
        window.location.href = 'main.html';
    }
})
