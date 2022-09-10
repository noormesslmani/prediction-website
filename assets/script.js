
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
                //loop over all possible countries and concatenate them to countries
                for (let i=0;i<data.country.length; i++){
                    countries+= data.country[i]["country_id"]
                    if (i<data.country.length-1){
                        countries+=", "
                    }
                } 

            //Check if countries were found
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
    fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(data => {
            dog.innerHTML=`<img src="${data.message}" class="dog" alt="Dog photo" />`
    })
}

//Runnig the function display dog when website is loaded
window.onload = displayDog
