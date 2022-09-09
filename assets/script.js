
const dog = document.getElementById('dog-img')
const inputName = document.getElementById('input-name')
const parag1 = document.getElementById('paragraph1')
const parag2 = document.getElementById('paragraph2')
const parag3 = document.getElementById('paragraph3')
const button = document.getElementById('button')
console.log('Hello')
let fname= 'Ali'
let url
button.addEventListener('click',predictInformation)
function predictInformation(){
    parag1.textContent='gender is:'
    parag2.textContent='age is:'
    parag3.textContent='nationality is:'

    fname= inputName.value
    url='https://api.genderize.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            parag1.textContent += data.gender       
    })
    

    
    url='https://api.agify.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            parag2.textContent += data.age       
    })
    

    let countries=''
    url='https://api.nationalize.io/?name='+ fname
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i=0;i<data.country.length; i++){
                countries+= data.country[i]["country_id"]+' '
        }  
        parag3.textContent += countries
    })
}


function displayDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            dog.innerHTML=`<img src="${data.message}" class="dog" />`
    })
}
window.onload = displayDog
