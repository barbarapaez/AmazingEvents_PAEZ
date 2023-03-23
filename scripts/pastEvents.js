import  {cards, createCheckboxes, pastEvents, checkboxFilter, searchBarFilter} from "./functions.js";

const element = document.getElementById("cardElement");
let eventList = []
let currentDate
const checkboxElement = document.getElementById("checkboxCreation");
const input = document.querySelector('.input')


function getEvents(){
    fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
        eventList = data.events
        currentDate = data.currentDate
        let sortedPastEvents = pastEvents(eventList, currentDate)
        cards(sortedPastEvents, element)
        createCheckboxes(sortedPastEvents, checkboxElement)
        input.addEventListener('input', doubleFilter);
        checkboxElement.addEventListener('change', doubleFilter);
            //FUNCIÓN DE DOBLE FILTRADO
            function doubleFilter(){
                let checkboxFilteredArray = checkboxFilter(sortedPastEvents)
                let checksAndTextFilter = searchBarFilter(checkboxFilteredArray, input.value);
                cards(checksAndTextFilter, element)
            }
    }).catch(err=>console.error(err))
} getEvents()