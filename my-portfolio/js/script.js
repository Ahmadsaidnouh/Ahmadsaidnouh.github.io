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
        document.querySelector(`.section.${sectionName}`).style.left = (screenWidth > 1199) ? "270px" : "0";
        setTimeout(() =>
        {
            document.querySelector(`.section.${currentSectionName}`).style.left = "100%"
            currentSectionName = sectionName
        }, 300)

    }
}
window.addEventListener('resize', () =>
{
    let screenWidth = window.innerWidth;
    document.querySelector(`.section.${currentSectionName}`).style.left = (screenWidth > 1199) ? "270px" : "0";
});

function displayCopiedMessage(messageContainer)
{
    document.querySelector(`.${messageContainer} .message-tip`).style.display = "flex"
    setTimeout(() =>
    {
        document.querySelector(`.${messageContainer} .message-tip`).style.display = "none"
    }, 1500)
}

function copyToClipboard(text, messageContainer)
{
    // create a temporary textarea element to hold the text
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);

    // select the text and copy it to the clipboard
    textarea.select();
    document.execCommand('copy');

    // remove the temporary element from the document
    document.body.removeChild(textarea);

    displayCopiedMessage(messageContainer)
}




// Glow effent
// const handleOnMouseMove = e =>
// {
//     const { currentTarget: target } = e;
//     // console.log(target.previousElementSibling);
//     // const imageHeight = target.previousElementSibling ? target.previousElementSibling.clientHeight : 0;
//     const rect = target.getBoundingClientRect(),
//         x = e.clientX - rect.left,
//         y = e.clientY - rect.top;
//     // y = e.clientY - rect.top + imageHeight;

//     // console.log(imageHeight,rect.left,rect.top,x,y);
//     target.style.setProperty("--mouse-x", `${x}px`)
//     target.style.setProperty("--mouse-y", `${y}px`)
// }

// for (const card of document.querySelectorAll(".portfolio-item-content")) {
//     card.onmousemove = e => handleOnMouseMove(e);
// }
const cards = document.getElementsByClassName("portfolio-item-content")
document.getElementById("cards").onmousemove = e =>
{
    let cX = e.clientX, cY = e.clientY;
    for (const card of cards) {
        const rect = card.getBoundingClientRect(),
            x = cX - rect.left,
            y = cY - rect.top;
        // y = e.clientY - rect.top + imageHeight;

        // console.log(imageHeight,rect.left,rect.top,x,y);
        card.style.setProperty("--mouse-x", `${x}px`)
        card.style.setProperty("--mouse-y", `${y}px`)
    }
}

// const scrollPicker = document.querySelector('.scroll-picker ul');
// let selectedIndex = 1;
// let oldselectedIndex = 1;

// scrollPicker.addEventListener('scroll', () =>
// {
//     oldselectedIndex = selectedIndex
//     const scrollTop = scrollPicker.scrollTop;
//     const optionHeight = scrollPicker.querySelector('li').offsetHeight;
//     selectedIndex = Math.round(scrollTop / optionHeight);
//     scrollPicker.querySelectorAll('li')[selectedIndex].classList.add('selected')
//     if (selectedIndex != oldselectedIndex)
//         scrollPicker.querySelectorAll('li')[oldselectedIndex].classList.remove('selected')
//     // console.log(selectedIndex, oldselectedIndex);
//     //   selectedIndex = scrollPicker.querySelectorAll('li')[selectedIndex].textContent;
// });
