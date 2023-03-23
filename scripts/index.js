//TRAÍDA DE FUNCIONES NECESARIAS
import  {cards, createCheckboxes,checkboxFilter, searchBarFilter} from "./functions.js";

const element = document.getElementById("cardElement");
const checkboxElement = document.getElementById("checkboxCreation");
const input = document.querySelector('.input')

let eventList = []
function getEvents(){
    fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
        eventList = data.events
        cards(eventList, element)
        createCheckboxes(eventList, checkboxElement);
        input.addEventListener('input', doubleFilter);
        checkboxElement.addEventListener('change', doubleFilter);
    //FUNCIÓN DE DOBLE FILTRADO
        function doubleFilter(){
            let checkboxFilteredArray = checkboxFilter(eventList)
            let checksAndTextFilter = searchBarFilter(checkboxFilteredArray, input.value);
            cards(checksAndTextFilter, element)
        }
    }).catch(err=>console.error(err))
} getEvents()