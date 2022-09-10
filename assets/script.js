
const dog = document.getElementById('dog-img')
const inputName = document.getElementById('input-name')
const gen = document.getElementById('gender')
const age = document.getElementById('age')
const nat = document.getElementById('nationalities')
const button = document.getElementById('button')
let fname
let url
//add an event listener to the submit bottun on click
button.addEventListener('click',predictInformation)

//function that generates predictions
function predictInformation(){

    //initialize text contents
    gen.textContent='gender: '
    age.textContent='age: '
    nat.textContent='nationalities: '

    //predict gender and concatenate it to gen text content
    fname= inputName.value
    url='https://api.genderize.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            gen.textContent += data.gender       
    })
    

    //predict age and concatenate it to age text content
    url='https://api.agify.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            age.textContent += data.age       
    })
    
    //predict possible countries and concatenate them to countries text content
    let countries=''
    url='https://api.nationalize.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //loop over all possible countries and concatenate them to countries
            for (let i=0;i<data.country.length; i++){
                countries+= data.country[i]["country_id"]
                if (i<data.country.length-1){
                    countries+=", "
                }
            }  
        nat.textContent += countries
    })
}

//A function to display dog image
//an image tag is added to 'dog' div with a class=dog
function displayDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            dog.innerHTML=`<img src="${data.message}" class="dog" alt="Dog photo" />`
    })
}

//Runnig the function display dog when website is loaded
window.onload = displayDog
