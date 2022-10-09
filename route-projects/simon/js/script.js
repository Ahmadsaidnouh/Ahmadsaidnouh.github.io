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