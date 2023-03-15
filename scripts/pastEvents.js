import data from "./amazing.js"
import  {pastEvents, cards, createCheckboxes} from "./functions.js";
let element = document.getElementById("cardElement");
cards(pastEvents(data.events, data.currentDate), element);
let checkboxElement = document.getElementById("checkboxCreation");
createCheckboxes(data.events, checkboxElement);
const input = document.querySelector('.input')
console.log(input)
let pastEventsArr = [];
pastEventsArr = pastEvents(data.events, data.currentDate);

input.addEventListener('input', doubleFilter);
checkboxElement.addEventListener('change', doubleFilter);

//FUNCIÓN PARA LAS CHECKBOXES
function checkboxFilter(arr){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    let checkboxesArr = Array.from(checkboxes);
    let checkedCategories = checkboxesArr.filter(check => check.checked);
    let checkedCategoryValue = checkedCategories.map(checkChecked => checkChecked.value)
    let filteredArr = arr.filter(event => checkedCategoryValue.includes(event.category))
    if(checkedCategories.length>0){
        return filteredArr
    } else {
        return arr
    }
}

//FUNCIÓN PARA LA SEARCH BAR
function searchBarFilter(arr, text){
    let filteredArr = arr.filter(event => event.name.toLowerCase().includes(text.toLowerCase()))
    return filteredArr
}

//FUNCIÓN DE DOBLE FILTRADO
function doubleFilter(){
    let primerFiltro = checkboxFilter(pastEventsArr)
    let checksAndTextFilter = searchBarFilter(primerFiltro, input.value);
    console.log(checksAndTextFilter)
    cards(checksAndTextFilter, element)
}

