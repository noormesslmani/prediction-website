
const dog = document.getElementById('dog-img')
const inputName = document.getElementById('input-name')
const gen = document.getElementById('gender')
const age = document.getElementById('age')
const nat = document.getElementById('nationalities')
const button = document.getElementById('button')
const name1 = document.getElementById('name')
const pw = document.getElementById('pw')
const register= document.getElementById("rgstr_btn")
const login= document.getElementById("login_btn")
const signUp=document.getElementById("sign-up")
const enterName=document.getElementById("enter-name")
let fname
let url



register.addEventListener('click',store)
function store() {
    localStorage.setItem('name', name1.value)
    localStorage.setItem('pw', pw.value)
}

// check if stored data from register-form is equal to entered data in the login-form
login.addEventListener('click',check)
function check() {

    // stored data from the register-form
    var storedName = localStorage.getItem('name')
    var storedPw = localStorage.getItem('pw')

    // entered data from the login-form
    var userName = document.getElementById('userName')
    var userPw = document.getElementById('userPw')
    if(userName.value == storedName && userPw.value == storedPw){
        signUp.style.display= "none"
        enterName.style.display=''
    }
}





//add an event listener to the submit bottun on click
button.addEventListener('click',predictInformation)

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
    enterName.style.display="none"
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            dog.innerHTML=`<img src="${data.message}" class="dog" alt="Dog photo" />`
    })
}

//Runnig the function display dog when website is loaded
window.onload = displayDog
