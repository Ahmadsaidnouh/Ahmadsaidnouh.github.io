// be sure to open it with live server
// be sure to open it with live server
// be sure to open it with live server

"use strict"
let searchInput;
let searchBtn;
let forecast;
let fullURL = window.location.pathname.split('/');
let currentPageName = fullURL[fullURL.length - 1];

$(window).ready(() => {
    $("#loadingPg .lds-spinner").fadeOut(500, () => {
        $("#loadingPg").fadeOut(500, () => {
            $('body').css("overflow", "auto");
        });
    })
});

$('#navToggleBtn').click(() => {
    $("#toggleOptions").slideToggle(500)
})


if (currentPageName != "contact.html" || currentPageName != "contact.html") {
    searchInput = document.getElementById('search');
    searchBtn = document.getElementById('searchBtn');
    forecast = document.getElementById('forecast');


    async function displayWeather(region) {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=602f09b01613480db5340844210610&q=${region}&days=3`);
        if (response.status == 400) 
        {
            return;
        }
        else 
        {
            let finalResponse = await response.json();
            let date = new Date();
            let cartona = `<div class="row gx-0">
            <div class="col-lg-4" id="today">
                <div class="forecast-header d-flex justify-content-between">
                    <div class="day">${getDayName(date.getDay())}</div>
                    <div class="date">${date.getDate()}${getMonthName(date.getMonth())}</div>
                </div>
                <div class="forecast-body text-start">
                    <div class="location">${finalResponse.location.name}</div>
                    <div class="degree d-flex flex-lg-column flex-row align-items-start flex-wrap">
                        <div class="temperature">${finalResponse.current.temp_c}<sup>o</sup>C</div>
                        <img src="${finalResponse.current.condition.icon}" class="icon" width="90" alt="">
                    </div>
                    <div class="custom">${finalResponse.current.condition.text}</div>
                    <div class="details d-flex flex-wrap">
                        <div class="rain details-items d-flex  mt-2">
                            <img src="./images/icon-umberella.png" alt="">
                            <span>10%</span>
                        </div>
                        <div class="wind-speed details-items d-flex  mt-2">
                            <img src="./images/icon-wind.png" alt="">
                            <span>${finalResponse.current.wind_kph}km/h</span>
                        </div>
                        <div class="wind-direction details-items d-flex  mt-2">
                            <img src="./images/icon-compass.png" alt="">
                            <span>${getWindDirec(finalResponse.current.wind_dir)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4" id="tomorrow">
                <div class="forecast-header text-center">
                    <div class="day">${getDayName(date.getDay() + 1)}</div>
                </div>
                <div class="forecast-body text-center">
                    <img src="${finalResponse.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
                    <div class="degree">${finalResponse.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${finalResponse.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</small>
                    <div class="custom">${finalResponse.forecast.forecastday[1].day.condition.text}</div>
                </div>
            </div>
            <div class="col-lg-4" id="afterTomorrow">
                <div class="forecast-header text-center">
                    <div class="day">${getDayName(date.getDay() + 2)}</div>
                </div>
                <div class="forecast-body text-center">
                    <img src="${finalResponse.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
                    <div class="degree">${finalResponse.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${finalResponse.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</small>
                    <div class="custom">${finalResponse.forecast.forecastday[2].day.condition.text}</div>
                </div>
            </div>
        </div>`;

            forecast.innerHTML = cartona;
        }
    }

    // website open on cairo default
    displayWeather('cairo');

    searchInput.addEventListener('keyup', () => {
        displayWeather(searchInput.value);
    })
    searchBtn.addEventListener('click', () => {
        displayWeather(searchInput.value);
    })
}

// start utility function
function getDayName(index) {
    index = index % 7;
    switch (index) {
        case 0:
            return 'Sunday';
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
    }
}
function getMonthName(index) {
    switch (index) {
        case 0:
            return 'January';
        case 1:
            return 'February';
        case 2:
            return 'March';
        case 3:
            return 'April';
        case 4:
            return 'May';
        case 5:
            return 'June';
        case 6:
            return 'July';
        case 7:
            return 'August';
        case 8:
            return 'September';
        case 9:
            return 'October';
        case 10:
            return 'November';
        case 11:
            return 'December';
    }
}
function getWindDirec(direc) {
    switch (direc) {
        case "N":
            return 'North';
        case "NNE":
            return 'North';
        case "NE":
            return 'Eastern North';
        case "ENE":
            return 'East';
        case "E":
            return 'East';
        case "ESE":
            return 'East';
        case "SE":
            return 'Eastern South';
        case "SSE":
            return 'South';
        case "S":
            return 'South';
        case "SSW":
            return 'South';
        case "SW":
            return 'Western South';
        case "WSW":
            return 'West';
        case "W":
            return 'West';
        case "WNW":
            return 'West';
        case "NW":
            return 'Western North';
        case "NNW":
            return 'North';
    }
}
// end utility function