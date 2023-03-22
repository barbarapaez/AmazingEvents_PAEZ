//CONSTANTE PARA SEÑALAR DÓNDE ESTOY TRABAJANDO, PRIMERA TABLA
const rowOne = document.getElementById("firstRow")
const rowTwo = document.getElementById("secondRow")
const rowThree = document.getElementById("thirdRow")

//TRAÍDA DE FUNCIONES NECESARIAS
import  {pastEvents, upcomingEvents, eventStatsByName, drawTd, drawTdExpanded} from "./functions.js";


//DECLARACIÓN DE VARIABLES NECESARIAS
let eventList = []
let currentDate

//TRAÍDA DE DATOS DE LOS EVENTOS Y PUESTA EN USO DE LAS FUNCIONES NECESARIAS
function getEvents(){
    fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
        eventList = data.events
        currentDate = data.currentDate
        let sortedPastEvents = pastEvents(eventList, currentDate)
        let sortedUpcomingEvents = upcomingEvents(eventList, currentDate)
        drawTd(eventStatsByName(sortedPastEvents, eventList), rowOne)
        drawTdExpanded(sortedUpcomingEvents, rowTwo)
        drawTdExpanded(sortedPastEvents, rowThree)
}).catch(err=>console.error(err))
} getEvents()