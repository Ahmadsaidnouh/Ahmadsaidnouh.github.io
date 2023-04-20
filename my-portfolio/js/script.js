// be sure to open it with live server
// be sure to open it with live server
// be sure to open it with live server

"use strict"
var typed = new Typed('.typing', {
    strings: ["Software Engineer", "Frontend Developer", "Backend Developer", "Web Developer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
})

const navTogglerBtn = document.querySelector(".nav-toggler");
navTogglerBtn.addEventListener("click", () =>
{
    document.querySelector(".aside").classList.toggle("show")
    document.querySelector(".aside .nav-toggler").classList.toggle("nav-toggler-animate")
})

const navLinks = document.querySelectorAll(".nav-link")



const home = document.querySelector(".home")
const about = document.querySelector(".about")
const service = document.querySelector(".service")
const portfolio = document.querySelector(".portfolio")
const contact = document.querySelector(".contact")

let currentSectionName = 'home'
function displaySection(sectionName)
{
    console.log(sectionName);
    navLinks.forEach((nav) =>
    {
        nav.classList.remove("active")
    })
    document.querySelector(`.nav-${sectionName}`).classList.add("active")
    if (document.querySelector(".aside").classList.contains("show")) {
        document.querySelector(".aside").classList.remove("show");
        document.querySelector(".aside .nav-toggler").classList.toggle("nav-toggler-animate");
    }
    if (currentSectionName != sectionName) {
        let screenWidth = window.innerWidth;
        // console.log(currentSectionName, sectionName, `.section.${sectionName}`);
        document.querySelector(`.section.${currentSectionName}`).style.zIndex = "0"
        document.querySelector(`.section.${sectionName}`).style.zIndex = "1"
        document.querySelector(`.section.${sectionName}`).style.left = (screenWidth > 1199) ? "270px": "0";
        setTimeout(() =>
        {
            document.querySelector(`.section.${currentSectionName}`).style.left = "100%"
            currentSectionName = sectionName
        }, 300)

    }
}
window.addEventListener('resize', () => {
    let screenWidth = window.innerWidth;
    document.querySelector(`.section.${currentSectionName}`).style.left = (screenWidth > 1199) ? "270px": "0";
});