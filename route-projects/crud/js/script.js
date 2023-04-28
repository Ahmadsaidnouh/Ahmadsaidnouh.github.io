// // var myFullName = ['Ahmad','Said','Mohammed','Nouh'];
// // for(var i = 0; i < myFullName.length; i++)
// // {
// //     console.log(myFullName[i]);
// // }

var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var controlBtn = document.getElementById("controlBtn");
var isUpdating = false;
var indexToUpdate;

var data;

controlBtn.disabled = true;

function checkingBtn() {
    if(productName.value == "" || productCategory.value == "" || productPrice.value == "") controlBtn.disabled = true;
    else controlBtn.disabled = false;
}

productName.addEventListener('keyup',checkingBtn);
productCategory.addEventListener('keyup',checkingBtn);
productPrice.addEventListener('keyup',checkingBtn);

if (localStorage.getItem("data") != null) {
    data = JSON.parse(localStorage.getItem("data"));
    display();
}
else {
    data = [];
}

function controlFun() {
    if(productName.value == "" || productCategory.value == "" || productPrice.value == "")
    {
        document.getElementById("warning").style.display = "block";
    }
    else 
    {
        document.getElementById("warning").style.display = "none";

        if(isUpdating)
        {
            updateItem();
        }
        else
        {
            addItems();
        }
        controlBtn.disabled = true;
    }
    
    
}
function addItems() {
    var product = {
        productName: productName.value,
        productCategory: productCategory.value,
        productPrice: productPrice.value,
    }
    data.push(product);
    updateData();
}
function clearInputs() {
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
}

function display() {
    var cartona = ``;
    for (var i = 0; i < data.length; i++) {
        cartona += `<tr>
        <td>${i + 1}</td>
        <td>${data[i].productName}</td>
        <td>${data[i].productCategory}</td>
        <td>${data[i].productPrice}</td>
        <td><button class="btn btn-info" onclick="displayItemToUpdate(${i})">update</button></td>
        <td><button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tBody").innerHTML = cartona;
}

function updateData() {
    localStorage.setItem("data", JSON.stringify(data));
    display();
    clearInputs();
}
function deleteItem(index) {
    data.splice(index, 1);
    updateData();
}
function displayItemToUpdate(index) {
    controlBtn.disabled = false;
    productName.value = data[index].productName;
    productCategory.value = data[index].productCategory;
    productPrice.value = data[index].productPrice;
    controlBtn.innerHTML = "Update";
    indexToUpdate = index;
    isUpdating = true;
}
function updateItem() {
    data[indexToUpdate].productName = productName.value;
    data[indexToUpdate].productCategory = productCategory.value;
    data[indexToUpdate].productPrice = productPrice.value;
    controlBtn.innerHTML = "Add";
    isUpdating = false;
    updateData();
}
function search(term) {
    var cartona = ``;
    for (var i = 0; i < data.length; i++) {
        if(data[i].productName.toLowerCase().includes(term.toLowerCase()))
        {
            cartona += `<tr>
                <td>${i + 1}</td>
                <td>${data[i].productName}</td>
                <td>${data[i].productCategory}</td>
                <td>${data[i].productPrice}</td>
                <td><button class="btn btn-info" onclick="displayItemToUpdate(${i})">update</button></td>
                <td><button class="btn btn-danger" onclick="deleteItem(${i})">Delete</button></td>
                </tr>`;
        }
    }
    document.getElementById("tBody").innerHTML = cartona;
}