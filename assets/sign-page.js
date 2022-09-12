const name1 = document.getElementById('name')
const pw = document.getElementById('pw')
const register= document.getElementById("rgstr_btn")
const signInButton= document.getElementById("signin-button")
const signMenu=document.getElementById("sign-menu")
const enterName=document.getElementById("enter-name")
const logInForm= document.getElementById("login-form")

//to be displayed when invalid username/password is entered
let para = document.createElement("p")
const node = document.createTextNode("Invalid username/password")

register.addEventListener('click',storeData)
function storeData() {
    localStorage.setItem('name', name1.value)
    localStorage.setItem('pw', pw.value)
    window.location.reload()
}

//check if stored data from register-form matches the entered data in the login-form
//add an event listener upon click to signin button
signInButton.addEventListener('click',checkData)
function checkData() {
    // stored data from the register-form
    var storedName = localStorage.getItem('name')
    var storedPw = localStorage.getItem('pw')

    // entered data from the login-form
    var userName = document.getElementById('userName')
    var userPw = document.getElementById('userPw')

    
    //if correct data is entered display the enter your name menu
    if(userName.value == storedName && userPw.value == storedPw){
        window.location.replace('./index.html')
    }
    //otherwise display an Invalid username/password message
    else{
        para.appendChild(node)
        if (logInForm.querySelector('.para') == null) {
            document.getElementById("login-form").appendChild(para)   
        }
    }
}


