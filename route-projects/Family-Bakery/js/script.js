let firstSection = $("#about").offset().top;
let activeNavSectionIndex = 0;

$(document).ready(() =>
{
    $("#loader .spinner").fadeOut(500, () =>
    {
        $("#loader").fadeOut(500, () =>
        {
            $("body").css("overflow-y", "auto")
            $("#loader").remove();
        });
    })
})

$(window).scroll(() =>
{
    let wScroll = $(window).scrollTop();
    if (wScroll > (firstSection - 400)) {
        $("#moveToTop").fadeIn(500);
        document.querySelector(".navbar").style.cssText = "padding : 4px 0px !important";
        document.querySelector(".navbar-toggler").style.cssText = "padding : 0px 12px !important";
    }
    else {
        $("#moveToTop").fadeOut(500);
        document.querySelector(".navbar").style.cssText = "padding : 8px  0px !important";
        document.querySelector(".navbar-toggler").style.cssText = "padding : 4px 12px !important";

    }
})

$("#moveToTop").click(() =>
{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

$("#sideBar .fa-cogs").click(() =>
{
    $("#sideBar .content").css("boxShadow", "-1px 2px 3px rgba(0, 0, 0, 0.1)")
    $("#sideBar").animate({ right: "250px" }, 200);
    document.querySelector("#sideBar .r-btn-opt-carriage-cross").classList.replace("d-none", "d-block");
})

$("#sideBar .r-btn-opt-carriage-cross").click(() =>
{
    document.querySelector("#sideBar .r-btn-opt-carriage-cross").classList.replace("d-block", "d-none");
    $("#sideBar").animate({ right: "0px" }, 200);
    $("#sideBar .content").css("boxShadow", "0px 0px 0px rgba(0, 0, 0, 0)")
})

$("#sideBar .r-btn-opt-carriage").mouseover(() =>
{
    document.querySelector("#sideBar .message").classList.replace("d-none", "d-block")
})

$("#sideBar .r-btn-opt-carriage").mouseleave(() =>
{
    document.querySelector("#sideBar .message").classList.replace("d-block", "d-none")
})

$("nav div a").click((e) =>
{
    // anchor holds the item that is selected from the navbar
    let anchor = e.target;

    // now sectionId will hold the id of the desired section
    let sectionId = anchor.getAttribute("data-link");

    // this is to delete the "#" from the sectionId
    sectionId = sectionId.slice(1);

    // now the section holds the desired section
    let section = document.getElementById(sectionId);

    // to handle the "active" class
    $(".nav-item a").eq(activeNavSectionIndex).removeClass("active");
    anchor.classList.add("active");

    // to update the value of the activeNavSection
    activeNavSectionIndex = Array.from(document.querySelectorAll(".nav-item a")).indexOf(anchor);

    // to scroll smoothly to the top of the desired section
    section.scrollIntoView({ 
        behavior: "smooth",
        block: "start" 
    })
})

$(".head-bottom-icon").click(() =>
{
    document.getElementById("about").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})