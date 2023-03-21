//CONSTANTE PARA SEÑALAR DÓNDE ESTOY TRABAJANDO, PRIMERA TABLA
const tableOne = document.getElementById("firstTable")

//TRAÍDA DE FUNCIONES NECESARIAS
import  {pastEvents, upcomingEvents} from "./functions.js";


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
        drawTd(eventStatistics(sortedPastEvents, eventList), tableOne)
        upcomingEventsStatistics(sortedUpcomingEvents)
/*         getCategories(eventList)
        categoriesStatistics(eventList, getCategories(eventList))
        drawTr((eventStatistics(pastEvents(eventList, currentDate),eventList)), tableOne) */

    }).catch(err=>console.error(err))
} getEvents()

//FUNCIÓN QUE, DADOS DOS ARRAYS (ARR1=LISTA DE EVENTOS; ARR2=CATEGORIAS) DEVUELVE STATS PARA LA PRIMERA TABLA COMO UN OBJETO
function eventStatistics(arr1, arr2) {
    let highestAttendenceEvent = arr1.reduce((prev, current) => (prev.assistance > current.assistance) ? prev : current).name
    let lowestAttendenceEvent = arr1.reduce((prev, current) => (prev.assistance < current.assistance) ? prev : current).name
    let capacity = arr2.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).name
    /* arr.sort((a, b) => a.capacity - b.capacity)[0] */
    let result =  {
        highestAttendenceEvent: highestAttendenceEvent,
        lowestAttendenceEvent: lowestAttendenceEvent, 
        highestCapacityEvent: capacity
    }
    return result
}

//FUNCIÓN PARA DIBUJAR LA TABLA
function drawTd(data, container){
    container.innerHTML = ''
    let fragment = document.createDocumentFragment()
    for (let key in data) {
        let td = document.createElement("td")
        td.classList = ""
        td.innerHTML = 
        `${data[key]}` 
        fragment.appendChild(td)
    } container.appendChild(fragment)
}

//FUNCIÓN QUE DA COMO RESULTADO UN ARRAY, DEVUELVE LAS CATEGORIAS DE TODOS LOS EVENTOS, SIN REPETIR
function getCategories (arr){
    let categories = [...new Set((arr.map(item => item.category).flat()))]
/*     let categories = [...new Set((arr.map(item => item.category).flat()).map(item => item.toLowerCase()))]
 */    
    return categories
}

//FUNCIÓN PARA OBTENER LAS ESTADÍSTICAS POR CATEGORÍA DE LOS UPCOMING EVENTS


//arr 1= array de eventos; arr 2 = array de categorias
//for each de cada genero, y voy viendo de este género en particular qué está pasando
/* function categoriesStatistics(arr1, arr2){
    let eventsForEachCategory = arr1.filter(item => arr2.includes(item.category[0]).toLowerCase())
    console.log(eventsForEachCategory)
} */