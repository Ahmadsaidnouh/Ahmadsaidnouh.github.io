let nameInput = document.getElementById("name");
let urlInput = document.getElementById("url");
let submitButton = document.getElementById("submit");
let nameWarning = document.getElementById("nameWarning");
let urlWarning = document.getElementById("urlWarning");
let URLs;


if (localStorage.getItem("URLs") != null) {
    URLs = JSON.parse(localStorage.getItem("URLs"));
    displayURLs();
}
else {
    URLs = [];
}

submitButton.addEventListener('click' , addItem);
document.addEventListener('keyup' , function(e) {
    if(e.key == 'Enter') 
    {
        addItem();
    }
});

function addItem() {
    resetWarnings();
    if (nameInput.value == '' || urlInput.value == '' || nameExists(nameInput.value)) 
    {
        displayWarnings();
    }
    else 
    {
        let urlHolder = urlInput.value;
        if(isValidURL(urlHolder) == false)
        {
            urlHolder = "https://" + urlHolder;
        }
        
        let urlTemp = {
            name: nameInput.value,
            url: urlHolder
        };
        URLs.push(urlTemp);
        localStorage.setItem("URLs" , JSON.stringify(URLs));
        clearInputs();
        displayURLs();
    }
}

function resetWarnings() {
    nameWarning.classList.replace('d-block' , 'd-none');
    urlWarning.classList.replace('d-block' , 'd-none');
}

function displayWarnings() {
    if (nameInput.value == '')
    {
        nameWarning.innerHTML = "Name is required"
        nameWarning.classList.replace('d-none' , 'd-block')
    }
    if (nameExists(nameInput.value))
    {
        nameWarning.innerHTML = "This name already exist"
        nameWarning.classList.replace('d-none' , 'd-block')
    }
    if (urlInput.value == '')
    {
        urlWarning.classList.replace('d-none' , 'd-block')
    }
    
}

function isValidURL(urlHolder) {
    let regex = /^(https:\/\/|http:\/\/)/gm;
    return regex.test(urlHolder);
}

function clearInputs() {
    nameInput.value = '';
    urlInput.value = '';
}

function displayURLs() {
    let cartona = ``;
    for(let i = 0; i < URLs.length; i++)
    {
        cartona += `<div class="url-table-row">
        <div class="w-50 d-flex justify-content-between p-3 mt-4">
        <h3>${URLs[i].name}</h3>
        <div>
            <a href="${URLs[i].url}" target="_blank" class="btn btn-primary me-1">Visit</a>
            <!-- <button onclick="visitURL(${i})" class="btn btn-primary me-1">Visit</button> -->
            <button class="btn btn-danger" onclick="deleteItem(${i});">Delete</button>
        </div>
    </div>
    </div>`
    }
    document.getElementById("url-table").innerHTML = cartona;
}

function deleteItem(index) {
    URLs.splice(index,1);
    localStorage.setItem("URLs" , JSON.stringify(URLs));
    displayURLs();
}

function nameExists(urlName) {
    for(let i = 0; i < URLs.length; i++) 
    {
        if(urlName.toLowerCase() == URLs[i].name.toLowerCase())
            return true;
    }
    return false;
}