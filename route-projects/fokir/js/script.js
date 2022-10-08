let aboutSectionTopOffset = $("#about").offset().top;
let navTogglerCurrentStatus = "hidden";


$(document).ready(() =>
{
    $("#loader .lds-spinner").fadeOut(500, () =>
    {
        $("#loader").fadeOut(500, () =>
        {
            $("body").css("overflow-y", "auto")
            $("#loader").remove();
            wScroll = $(window).scrollTop();
            if (wScroll > 150)
                document.querySelectorAll("nav").forEach((nav) =>
                {
                    nav.style.cssText = "background-color: rgb(5,5,5)";
                })
            else
                document.querySelectorAll("nav").forEach((nav) =>
                {
                    nav.style.cssText = "background-color: transparent";
                })
        });
    })
    let
})

$(window).scroll(() =>
{
    let wScroll = $(window).scrollTop();
    if (wScroll > 150)
        document.querySelectorAll("nav").forEach((nav) =>
        {
            nav.style.cssText = "background-color: rgb(5,5,5)";
        })
    else
        document.querySelectorAll("nav").forEach((nav) =>
        {
            nav.style.cssText = "background-color: transparent";
        })

})

$("#nav-btn-toggler").click(() =>
{
    if (navTogglerCurrentStatus == "hidden") {
        document.getElementById("nav-dropDown").classList.add("show");
        navTogglerCurrentStatus = "visible";
    }
    else {
        document.getElementById("nav-dropDown").classList.remove("show");
        navTogglerCurrentStatus = "hidden";
    }


})

$("nav ul a").click((e) =>
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
    $("nav ul a").removeClass("active");
    anchor.classList.add("active");

    // to scroll smoothly to the top of the desired section
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })

})

$(".porto-btns button").click((e) =>
{
    let selected = e.target.getAttribute("id");
    $(".porto-btns button").removeClass("porto-active");
    $(e.target).addClass("porto-active");
    $(".all").fadeOut(400, () =>
    {
        $(`.${selected}`).fadeIn(300);
    });
})