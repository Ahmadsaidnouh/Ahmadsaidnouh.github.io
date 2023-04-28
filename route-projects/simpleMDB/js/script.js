"use strict"

let myHttp = new XMLHttpRequest();
let data = [];
let movieContainer = document.getElementById("movies-container")
let tvContainer = document.getElementById("tv-container");
let lightBox = document.getElementById("lightBox");
let lightBoxBody = document.querySelector("#lightBox .row");
let lightBoxContainer = document.querySelector(".light-box-container");
let lightBoxImg;
let lightBoxText;
let closeBtn = document.getElementById("close");


myHttp.open("GET", "https://api.themoviedb.org/3/trending/all/week?api_key=6095507f96351eea753d5123d0ee32c0");
myHttp.send();
myHttp.addEventListener('readystatechange', function () {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
        data = JSON.parse(myHttp.response).results;
        displayData();
    }
})

function displayData() {
    let movieCartona = `<div class="col-md-3 align-self-center">
    <h2 class=" text-white">Trending Movies</h2>
    </div>`
    let tvCartona = `<div class="col-md-3 align-self-center">
    <h2 class=" text-white">Trending TV</h2>
    </div>`

    for (let i = 0; i < data.length; i++) {
        if (data[i].media_type == 'movie') {
            movieCartona += `<div class="col-md-3 mb-4">
            <div class="mt-4 items bg-dark position-relative" onclick="displayLightBox(${i},'Movie')">
            <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="w-100" alt="">
            <div class="items-text p-1">
            <h3 class="text-white">${data[i].title}</h3>
            <p class="text-white m-0">${data[i].overview.split(' ').splice(0, 10).join(' ')}...</p>
            </div>
            <span class="rating">${data[i].vote_average}</span>
            </div>
            </div>`
        }
        else if (data[i].media_type == 'tv') {

            tvCartona += `<div class="col-md-3 mb-4">
            <div class="mt-4 items bg-dark position-relative" onclick="displayLightBox(${i},'TV') ">
            <img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" class="w-100" alt="">
            <div class="items-text p-1">
            <h3 class="text-white">${data[i].name}</h3>
            <p class="text-white">${data[i].overview.split(' ').splice(0, 10).join(' ')}...</p>
            </div>
            <span class="rating">${data[i].vote_average}</span>
            </div>
            </div>`
        }

    }
    movieContainer.innerHTML = movieCartona;
    tvContainer.innerHTML = tvCartona;
}

function displayLightBox(index, type) {
    lightBoxBody.innerHTML = `<div id="lightBoxImg" class="col-5">
    <img src="https://image.tmdb.org/t/p/w500${data[index].poster_path}" alt="" class="w-75">
</div>
<div id="lightBoxText" class="col-6 offset-1 align-self-center overflow-auto">
<h3 class="pb-2">Name: <span>${type == 'TV' ? data[index].name : data[index].title}</span></h3>
<h4 class="pb-2">Type: <span>${type}</span></h4>
<h4 class="pb-2">Rating: <span>${data[index].vote_average}</span></h4>
<p><span>About: </span>${data[index].overview}</p>
</div>`
    lightBoxImg = document.getElementById("lightBoxImg");
    lightBoxText = document.getElementById("lightBoxText");
    lightBox.classList.replace('d-none', 'd-block');
    addEventListenersToLightBox();
}

function closeLightBox() {
    lightBox.classList.replace('d-block', 'd-none');
}

function addEventListenersToLightBox() {
    lightBoxContainer.addEventListener('click' , closeLightBox);
    lightBoxImg.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    lightBoxText.addEventListener('click', function (e) {
        e.stopPropagation();
    })
}

closeBtn.addEventListener('click', closeLightBox);
document.addEventListener('keydown' , function(e) {
    if(e.key == 'Escape') closeLightBox();
})


// let x = function() {
//     // "this strict"
//     console.log(this);
// }

// x()

let x = {a:34,b:"ahmad"}
// console.log(x.a);
let xMap = new Map(Object.entries(x));
for(let xn of xMap) {
    console.log(xn);

}