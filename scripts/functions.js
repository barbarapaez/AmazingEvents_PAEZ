function pastEvents(events, date) {
    let sortedPastEvents = [];
    for(let event of events){
        if(Date.parse(event.date)<Date.parse(date)){
            sortedPastEvents.push(event);
        }
    }
    return sortedPastEvents
}
function upcomingEvents(events, date) {
    let sortedUpcomingEvents = [];
    for (let event of events){
        if(Date.parse(event.date)>Date.parse(date)){
            sortedUpcomingEvents.push(event);
        }
    }
    return sortedUpcomingEvents
}
function cards(arr, container) {
    if (arr.length == 0){
        return container.innerHTML = `<h3 id="noEvent" >No such event found :(</h3>`
    }
    container.innerHTML = ""
    let fragment = document.createDocumentFragment();
    arr.forEach((event) => {
        let div = document.createElement("div");
        div.innerHTML = `
            <div class="card h-100" style="width: 16rem;">
            <img src="${event.image}" class="card-img-top" alt="${event.name}">
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <div class="card-footer bg-transparent d-inline-flex">
                    <p class="card-text price">Price $${event.price}</p>
                    <a href="../pages/details.html?id=${event._id}" class="btn card-btn card link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>`;
        fragment.appendChild(div);
    });
    container.appendChild(fragment);
}
/* function filterSearchAndCheckboxes(x, y){
    let filterText = searchBarFilter(x, y);
    let filterClick = filterCategories(filterText);
    cards(filterClick);
} */
function createCheckboxes (arr, container){
    let arrayCategories = arr.map(event => event.category);
    let setCategories = new Set(arrayCategories);
    let arrayCategoriesChecks = Array.from(setCategories);
    let fragment = document.createDocumentFragment();
    arrayCategoriesChecks.forEach((category) => {
        let div = document.createElement("div"); 
        div.innerHTML = `
        <div class="form-check">
        <input class="form-check-input" type="checkbox" id="${category}" value="${category}">
        <label class="form-check-label" for="${category}">${category}</label>
        </div>
        `;
        fragment.appendChild(div);
    });
    container.appendChild(fragment);
}

//AGREGADAS PARA LA TASK_4
//FUNCIÓN QUE, DADOS DOS ARRAYS (ARR1=LISTA DE EVENTOS PASADOS; ARR2=LISTA DE EVENTOS COMPLETA) DEVUELVE STATS PARA LA PRIMERA TABLA COMO UN OBJETO
function eventStatsByName(arr1, arr2) {
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
    let fragment = document.createElement("tr")
    for (let key in data) {
        let td = document.createElement("td")
        td.classList = ""
        td.innerHTML = 
        `${data[key]}` 
        fragment.appendChild(td)
    } 
    container.parentNode.insertBefore(fragment, container)
}

//FUNCIÓN QUE DA COMO RESULTADO UN ARRAY, DEVUELVE LAS CATEGORIAS DE TODOS LOS EVENTOS, SIN REPETIR
function getCategories (arr){
    let categories = [...new Set(arr.map(item => item.category).flat())]
/*     let categories = [...new Set((arr.map(item => item.category).flat()).map(item => item.toLowerCase()))]
 */    
    return categories
}

//FUNCIÓN QUE DADO UN ARRAY DE EVENTOS DEVUELVE UN OBJETO DONDE LAS CLAVES SON LAS CATEOGORÍAS Y LOS VALORES SON SU GANANCIA, CAPACIDAD ETC
function eventsStatsByCategory(events) {
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

//FUNCIÓN PARA DIBUJAR FILAS SUCESIVAS USANDO LA FUNCIÓN DRAWTD, LA FUNCIÓN RECIBE UN ARRAY (PARA TRANSFORMARLO EN OBJETO) Y LA UBICACIÓN EN EL HTML
function drawTdExpanded(arr, container){
    let array = eventsStatsByCategory(arr)
        for (let key in array) {
            drawTd(array[key], container)
        }
}

export {pastEvents, upcomingEvents, cards, createCheckboxes, eventStatsByName, drawTd, eventsStatsByCategory, drawTdExpanded}