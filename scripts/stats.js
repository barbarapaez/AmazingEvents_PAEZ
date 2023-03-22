//CONSTANTE PARA SEÑALAR DÓNDE ESTOY TRABAJANDO, PRIMERA TABLA
const tableOne = document.getElementById("firstTable")
const tableTwo = document.getElementById("secondTable")
const tableThree = document.getElementById("thirdTable")

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
        let upcomingStats = eventsStats(sortedUpcomingEvents)
        for (let key in upcomingStats) {
            drawTd(upcomingStats[key], tableTwo)
        }
        let pastStats = eventsStats(sortedPastEvents)
        for (let key in pastStats) {
            drawTd(pastStats[key], tableThree)
        }


}).catch(err=>console.error(err))
} getEvents()

//FUNCIÓN QUE, DADOS DOS ARRAYS (ARR1=LISTA DE EVENTOS PASADOS; ARR2=LISTA DE EVENTOS COMPLETA) DEVUELVE STATS PARA LA PRIMERA TABLA COMO UN OBJETO
function eventStatistics(arr1, arr2) {
    let highestAttendenceEvent = arr1.reduce((prev, current) => (prev.assistance/prev.capacity > current.assistance/current.capacity) ? prev : current).name
    let lowestAttendenceEvent = arr1.reduce((prev, current) => (prev.assistance/prev.capacity < current.assistance/current.capacity) ? prev : current).name
    let capacity = arr2.reduce((prev, current) => (prev.capacity > current.capacity) ? prev : current).name
    let result =  {
        highestAttendenceEvent: highestAttendenceEvent,
        lowestAttendenceEvent: lowestAttendenceEvent, 
        highestCapacityEvent: capacity
    }
    return result
}

//FUNCIÓN PARA DIBUJAR LA TABLA
function drawTd(data, container){
/*     let fragment = document.createDocumentFragment()
 */    let fragment = document.createElement("tr")
    for (let key in data) {
        let td = document.createElement("td")
        td.classList = ""
        td.innerHTML = 
        `${data[key]}` 
        fragment.appendChild(td)
    } 
/*     container.appendChild(fragment)
 */    container.parentNode.insertBefore(fragment, container)
}

//FUNCIÓN QUE DA COMO RESULTADO UN ARRAY, DEVUELVE LAS CATEGORIAS DE TODOS LOS EVENTOS, SIN REPETIR
function getCategories (arr){
    let categories = [...new Set(arr.map(item => item.category).flat())]
/*     let categories = [...new Set((arr.map(item => item.category).flat()).map(item => item.toLowerCase()))]
 */    
    return categories
}

//FUNCIÓN QUE DADO UN ARRAY DE EVENTOS DEVUELVE UN OBJETO DONDE LAS CLAVES SON LAS CATEOGORÍAS Y LOS VALORES SON SU GANANCIA, CAPACIDAD ETC
function eventsStats(events) {
    let categories = getCategories(events)
    let stats = {}
    //creación de valores inciiales para attendance, revenue y capacity dentro de cada categoría dentro del objeto stats
    categories.forEach((category) => {
        stats[category] = {
            category: category,
            revenue: 0,
            attendance: 0,
            capacity: 0
        }
    })
    events.forEach((event) => {
        //utilizar attendance si existe, sino estimate (pensando en la diferencia entre past y upcoming events)
        let eventAttendance = event.assistance ? event.assistance : event.estimate
        let eventRevenue = eventAttendance * event.price
        let eventCapacity = event.capacity
        let category = event.category
        stats[category].attendance += eventAttendance
        stats[category].revenue += eventRevenue
        stats[category].capacity += eventCapacity
    })
    //determinar attendancePercentage en base al promedio de todas las attendance y capacities
    categories.forEach((category) => {
        stats[category].attendancePercentage = ((stats[category].attendance/stats[category].capacity)*100).toFixed(2)
        delete stats[category].attendance
        delete stats[category].capacity
    })
    return stats
}

//