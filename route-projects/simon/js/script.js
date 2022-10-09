let navTogglerCurrentStatus = "hidden";

$(document).ready(() =>
{
    $("#loader .lds-spinner").fadeOut(500, () =>
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
    if (wScroll > 150)
        $("#moveToTop").fadeIn(500);
    else
        $("#moveToTop").fadeOut(500);

})

$("#moveToTop").click(() =>
{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

$(".nav-1 a").click((e) =>
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
    $(".nav-1 a").removeClass("active");
    anchor.classList.add("active");

    // to scroll smoothly to the top of the desired section
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })

})

$(".nav-2 a").click((e) =>
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
    $(".nav-2 a").removeClass("active");
    anchor.classList.add("active");

    // to scroll smoothly to the top of the desired section
    section.scrollIntoView({
        behavior: "smooth",
        block: "start"
    })

})

$(".chevron").click(() => {
    document.getElementById("about").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
})

$("#navToggler").click(() => {
    if(navTogglerCurrentStatus == "hidden") {
        navTogglerCurrentStatus = "visible";
        $("#navToggler .top-line").addClass("top-line-action");
        $("#navToggler .mid-line").addClass("mid-line-action");
        $("#navToggler .bottom-line").addClass("bottom-line-action");
        $(".nav-2-content").css("height","363px");
    }
    else {
        navTogglerCurrentStatus = "hidden";
        $("#navToggler .top-line").removeClass("top-line-action");
        $("#navToggler .mid-line").removeClass("mid-line-action");
        $("#navToggler .bottom-line").removeClass("bottom-line-action");
        $(".nav-2-content").css("height","0px");
    }
})