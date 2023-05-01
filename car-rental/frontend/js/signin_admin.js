const emailAdmin = document.getElementById("emailAdmin");
const passwordAdmin = document.getElementById("passwordAdmin");
const signInBtn = document.getElementById("signInBtn");

let validEmail = false
let validPassword = false

let isValidEmail = () => {
    // let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let zip = emailAdmin.value;
    return regex.test(zip);
}
let isValidPassword = () => {
    let pass = passwordAdmin.value;
    return (pass.length > 2) ? true : false;
}


signInBtn.addEventListener("click", () => {
    let admin = {
        email: emailAdmin.value,
        password: passwordAdmin.value
    }
    signInAdmin(admin)

})
emailAdmin.addEventListener("blur", () => {
    validEmail = isValidEmail
    emailPasswordChecker()
})
passwordAdmin.addEventListener("blur", () => {
    validPassword = isValidPassword
    emailPasswordChecker()
})

function emailPasswordChecker() {
    if (validEmail && validPassword) {
        signInBtn.disabled = false
    }
}
async function signInAdmin(admin) {
    let response = await fetch("https://car-rent-backend.vercel.app/getAdminId", {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
            "Content-Type": "application/json"
        }
    })
    let finalRes = await response.json();
    if (finalRes['data'].length > 0) {
        let specs = { isAdminLoggedIn:true }
        localStorage.setItem("isAdminLoggedIn",JSON.stringify(specs))
        window.location.href = "./admin.html"
    }
    else {
        alert("Error: Invalid email or password.\nPlease try again.")
    }
}