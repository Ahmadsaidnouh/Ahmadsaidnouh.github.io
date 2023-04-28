"use strict"
let userEmail = document.getElementById("userEmail");
let userPass = document.getElementById("userPass");
let nUserName = document.getElementById("nUserName");
let nUserEmail = document.getElementById("nUserEmail");
let nUserPass = document.getElementById("nUserPass");
let loginBtn = document.getElementById("loginBtn");
let signUpBtn = document.getElementById("signUpBtn");
let loginSpan = document.getElementById("loginMessage");
let signUpSpan = document.getElementById("signUpMessage");
let welcomeMessage = document.getElementById("welcomeMessage");
let allUsers;
let currentLogginngInUser;
let isHomeActivated = JSON.parse(localStorage.getItem('isHomeActivated'));
let fullURL = window.location.pathname.split('/');
let currentPageName = fullURL[fullURL.length - 1];

class NewUser 
{
    constructor (name , email, password) 
    {
        this.name = name;
        this.email = email;
        this.password = password; 
    }
}

// Start loading the array of users from local storage if exists.
if(localStorage.getItem('allUsers') != null)
{
    allUsers = JSON.parse(localStorage.getItem('allUsers'));
}
else 
{
    allUsers = [];
}
// End loading the array of users from local storage if exists.


// To ensure that home page can't be accessed unless there is currently a user logged in.
if((currentPageName == 'home.html' || currentPageName == 'home') && (isHomeActivated == false || isHomeActivated == null))
{
    changeWebPage('index.html');
}


/* To ensure that index page or signUp page can't be accessed if there is currently a user logged in. If a current logged in user exists,
   it will retrieve his/her data from local storage and then display welcome message.*/
if(JSON.parse(localStorage.getItem('isHomeActivated')) == true && (currentPageName != 'home.html'))
{
    changeWebPage('home.html');
}
else if(JSON.parse(localStorage.getItem('isHomeActivated')) == true)
{
    currentLogginngInUser = JSON.parse(localStorage.getItem('currentLoginUser'));
    isHomeActivated = JSON.parse(localStorage.getItem('isHomeActivated'));
    displayWelcomeMessage();
}
else
{
    currentLogginngInUser = null;
}


// Start main functions
function login() {
    resetLoginErrorMessage();
    if(userEmail.value == '' || userPass.value == '')
    {
        displayLoginErrorMessage("All inputs are required");
    }
    else
    {
        if(userExists(userEmail.value , userPass.value))
        {
            currentLogginngInUser = {email: userEmail.value , password:userPass.value};
            isHomeActivated = true;

            localStorage.setItem('currentLoginUser' , JSON.stringify(currentLogginngInUser));
            localStorage.setItem('isHomeActivated' , JSON.stringify(isHomeActivated));

            changeWebPage('home.html')
        }
        else
        {
            displayLoginErrorMessage("incorrect email or password")
        }
    }
}
function signUp() {
    resetSignUpMessage();
    let email = nUserEmail.value
    if(nUserEmail.value == '' || nUserName.value == '' || nUserPass.value == '')
    {
        displaySignUpMessage('All inputs are required' , 'danger' , 'success');
        
    }
    else if(emailExists(nUserEmail.value))
    {
        displaySignUpMessage('Email already exists' , 'danger' , 'success');
    }
    else if(isValidEmail(email) == false)
    {
        displaySignUpMessage('Invalid email' , 'danger' , 'success');
    }
    else
    {
        let nUser = new NewUser(nUserName.value , nUserEmail.value , nUserPass.value);
        allUsers.push(nUser);

        localStorage.setItem('allUsers' , JSON.stringify(allUsers));
        
        // To display success message for 5sec only.
        let successInterval = setInterval(() => {
            displaySignUpMessage('Success' , 'success' , 'danger');
        }, 50);
        setTimeout(() => {
            clearInterval(successInterval);
            resetSignUpMessage();
        }, 5000);

        resetSignUpInputs();
    }
    
}
function logout() {
    localStorage.removeItem('currentLoginUser');
    isHomeActivated = false;
    localStorage.setItem('isHomeActivated' , JSON.stringify(isHomeActivated));
    
    changeWebPage('index.html');
}
// End main functions


// Start helping function
function changeWebPage(pageName) {
    window.location.href = pageName;
}
function resetLoginErrorMessage() {
    loginSpan.classList.replace('d-block' , 'd-none');
}
function resetSignUpMessage() {
    signUpSpan.classList.replace('d-block' , 'd-none');
}
function resetSignUpInputs() {
    nUserName.value = '';
    nUserEmail.value = '';
    nUserPass.value = '';
}
function displayLoginErrorMessage(message) {
    loginSpan.innerHTML = message;
    loginSpan.classList.replace('d-none' , 'd-block');
}
function displaySignUpMessage(message , color1 , color2) {
    signUpSpan.innerHTML = message;
    signUpSpan.classList.replace('text-white' , `text-${color1}`);
    signUpSpan.classList.replace(`text-${color2}` , `text-${color1}`);
    signUpSpan.classList.replace('d-none' , 'd-block');
}
function displayWelcomeMessage() {
    welcomeMessage.innerHTML = `Welcome ${getUserName(currentLogginngInUser.email , currentLogginngInUser.password)}`
} 
function getUserName(email , password){
    for(let user of allUsers)
    {
        if(user.email.toLowerCase() == email.toLowerCase() && user.password == password)
        {
            return user.name;
        } 
    }
}  
// End helping functions


// Start validation functions
function emailExists(email) {
    for(let user of allUsers)
    {
        if(user.email.toLowerCase() == email.toLowerCase())
        {
            return true;
        } 
    }
    return false;
}
function userExists(email , password){
    for(let user of allUsers)
    {
        if(user.email.toLowerCase() == email.toLowerCase() && user.password == password)
        {
            return true;
        } 
    }
    return false;
    
}
function isValidEmail(email) {
    let regex = /^[a-zA-Z]([a-zA-Z0-9_.\-])+@([a-z.])+.(com|net|edu|org|gov|info|int|eg)$/gm;
    let isValid = regex.test(email);
    return isValid;
}
// End validation functions
