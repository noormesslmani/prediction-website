
const dog = document.getElementById('dog-img')
const inputName = document.getElementById('input-name')
const gen = document.getElementById('gender')
const age = document.getElementById('age')
const nat = document.getElementById('nationalities')
const submitButton = document.getElementById('submit-button')
const name1 = document.getElementById('name')
const pw = document.getElementById('pw')
const register= document.getElementById("rgstr_btn")
const signInButton= document.getElementById("signin-button")
const signMenu=document.getElementById("sign-menu")
const enterName=document.getElementById("enter-name")
const signOutButton= document.getElementById("signout-button")
const logInForm= document.getElementById("login-form")
const boredButton= document.getElementById("bored-button")
let fname
let url
//to be displayed when invalid username/password is entered
let para = document.createElement("p")
const node = document.createTextNode("Invalid username/password")

//sign-in/registration part

//store entered username and password in Local storage upon clicking on register button
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
        signMenu.style.display= "none" //hide sign in menu
        enterName.style.display='' //display ennter name menu
    }
    //otherwise display an Invalid username/password message
    else{
        para.appendChild(node)
        if (logInForm.querySelector('.para') == null) {
            document.getElementById("login-form").appendChild(para)   
        }
    }
}


//logout click and display signin menu on the screen
signOutButton.addEventListener('click',logOut)
function logOut(){
    signMenu.style.display= '' //display signin menu
    enterName.style.display='none' //hide enter name menu
}


//predictions part

//add an event listener to the submit bottun on click
submitButton.addEventListener('click',predictInformation)
//function that generates predictions
function predictInformation(){
    fname= inputName.value

    //reset the text contents to empty before each prediction, then check if a value is entered in textbox
    gen.textContent=''
    age.textContent=''
    nat.textContent=''

    //check if the user entered a value in the first place
    if (fname){

        //initialize predictions text contents
        gen.textContent='gender: '
        age.textContent='age: '
        nat.textContent='nationalities: '

        //predict gender and concatenate it to gen text content
        url='https://api.genderize.io/?name='+ fname
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //check if gender result is null
                if (data.gender){
                    gen.textContent += data.gender 
                }
                else{
                    gen.textContent += 'N/A'
                }      
        })
        
        //predict age and concatenate it to age text content
        url='https://api.agify.io/?name='+ fname
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //check if age result is null
                if(data.age){
                    age.textContent += data.age  
                }
                else{
                    age.textContent+='N/A'
                }     
        })
        
        //predict possible countries and concatenate them to countries text content
        let countries=''
        url='https://api.nationalize.io/?name='+ fname
        fetch(url)
            .then(res => res.json())
            .then(data => {
                //loop over possible countries and concatenate first 2 to countries
                for (let i=0;i<data.country.length; i++){
                    countries+= data.country[i]["country_id"]
                    if (i==1){
                        break
                    }
                    countries+=", "
                } 

            //Case of no countries were found
            if (countries==''){
                countries='N/A'
            }
            nat.textContent += countries
        })
    } 

    //Otherwise, with no input predictions would be undefined
    else{
        gen.textContent= "Undefined, please enter your name"
    }
}


//A function to display dog image onload
//an image tag is added to 'dog' div with a class=dog
function displayDog(){
    enterName.style.display='none' //hide enter name menu
    //display the dog image
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            dog.innerHTML=`<img src="${data.message}" class="dog" alt="Dog photo" />`
    })
}



//Runnig the function display dog when website is loaded
window.onload = displayDog

boredButton.addEventListener('click',bored)
//this is giving rise to errors on console
function bored(){
    axios.get("https://www.boredapi.com/api/activity").then((response) => {
        const users = response.data.activity
        console.log(users)
        }).catch((error) =>console.error(error))
}
