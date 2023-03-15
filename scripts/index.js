import data from "./amazing.js"
import  {cards, createCheckboxes /*,filterSearchAndCheckboxes , returnCheckedCards, searchBarFilter, filterCategories */} from "./functions.js";

const element = document.getElementById("cardElement");
cards(data.events, element);
const checkboxElement = document.getElementById("checkboxCreation");
createCheckboxes(data.events, checkboxElement);
const input = document.querySelector('.input')
console.log(input)
let events = [];
events = data.events

input.addEventListener('input', doubleFilter);
checkboxElement.addEventListener('change', doubleFilter);

//FUNCIÓN PARA LAS CHECKBOXES
function checkboxFilter(arr){
    let checkboxes = document.querySelectorAll("input[type='checkbox']")
    //ARRAY DE CHECKBOXES
    let checkboxesArr = Array.from(checkboxes);
    //ARRAY CON LA CATEGORÍA ESPECÍFICA QUE FUE CHEQUEADA, FORMATO INPUT
    let checkedCategories = checkboxesArr.filter(check => check.checked);
    //ARRAY QUE CONTIENE SÓLO LA CATEGORIA
    let checkedCategoryValue = checkedCategories.map(checkChecked => checkChecked.value)
    //FILTRADO DEL ARRAY COMPLETO SEGÚN LA CATEGORÍA CHEQUEADA
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
    let primerFiltro = checkboxFilter(events)
    let checksAndTextFilter = searchBarFilter(primerFiltro, input.value);
    console.log(checksAndTextFilter)
/*     let textFilter = searchBarFilter(events, input.value);
    let checksAndTextFilter = checkboxFilter(textFilter); */
    cards(checksAndTextFilter, element)
}