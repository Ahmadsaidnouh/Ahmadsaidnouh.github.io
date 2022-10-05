let welcome1 = `<section class="message d-flex text-center justify-content-center align-items-center"><h2 id="welcomeMessage">`;
let welcome2 = `</h2></section>`;
let isValidId = () =>
{
    let id = $("#userId").val();
    return (id.length >= 5 && id.length <= 15) ? true : false;
}
let isValidPassword = () =>
{
    let pass = $("#password").val();
    return (pass.length >= 7 && pass.length <= 15) ? true : false;
}
let isValidName = () =>
{
    let regex = /^[a-zA-Z ]+$/
    let name = $("#name").val();
    return regex.test(name);
}
let isValidCountry = () =>
{
    let country = $("#country").find(":selected").val();
    return (country != "(Please select a country)") ? true : false;
}
let isValidZIP = () =>
{
    let regex = /^[0-9]+$/
    let zip = $("#zip").val();
    return regex.test(zip);
}
let isValidEmail = () =>
{
    let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let zip = $("#email").val();
    return regex.test(zip);
}
let isValidGender = () =>
{
    return document.querySelector("#male").checked || document.querySelector("#female").checked;
}
let isValidLang = () =>
{
    return document.querySelector("#nonEnglish").checked || document.querySelector("#english").checked;
}
let hideAllAlerts = () =>
{
    document.querySelectorAll("#form .alert").forEach((ele) =>
    {

        ele.classList.replace("d-block", "d-none");
    })
}
let displayselectedAlert = (index) =>
{
    Array.from(document.querySelectorAll("#form .alert"))[index].classList.replace("d-none", "d-block");
}

$(document).ready(() =>
{
    $("#loading .spinner").fadeOut(500, () =>
    {
        $("#loading").fadeOut(500, () =>
        {
            $("body").css("overflow-y", "auto")
            $("#loading").remove();
        });
        document.querySelector(".main").style = "transform : translateY(0px)"
    })
})
$("#registerBtn").click(() =>
{
    hideAllAlerts();

    let noAlert = true;
    let firstAlert = -1;
    let validationFunctions = [
        isValidId,
        isValidPassword,
        isValidName,
        isValidCountry,
        isValidZIP,
        isValidEmail,
        isValidGender,
        isValidLang
    ]

    validationFunctions.forEach((isValid, index) =>
    {
        if (!isValid()) {
            if (noAlert)
                firstAlert = index;
            noAlert = false;
            displayselectedAlert(index);
        }
    })

    if (!noAlert) {
        let firstAlertTop = $("#form .alert").eq(firstAlert).offset().top - 100;
        $("html,body").animate({ scrollTop: `${firstAlertTop}` }, 300, "linear");
    }
    else {
        let fullWelcomeMessage = (welcome1 + ` Welcome ${$("#name").val()} ` + welcome2)
        $(".main").fadeOut(500, () =>
        {

            $(".main").remove();
            $("body").html(fullWelcomeMessage);

        });
    }
})