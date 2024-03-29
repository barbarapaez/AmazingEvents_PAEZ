//FUNCIÓN QUE DADO UN ARRAY Y UNA FECHA, DEVUELVE UN ARRAY CON LOS EVENTOS QUE TIENEN UNA FECHA ANTERIOR 
function pastEvents(events, date) {
    let sortedPastEvents = [];
    for(let event of events){
        if(Date.parse(event.date)<Date.parse(date)){
            sortedPastEvents.push(event);
        }
    }
    return sortedPastEvents
}
////FUNCIÓN QUE DADO UN ARRAY Y UNA FECHA, DEVUELVE UN ARRAY CON LOS EVENTOS QUE TIENEN UNA FECHA POSTERIOR 
function upcomingEvents(events, date) {
    let sortedUpcomingEvents = [];
    for (let event of events){
        if(Date.parse(event.date)>Date.parse(date)){
            sortedUpcomingEvents.push(event);
        }
    }
    return sortedUpcomingEvents
}
//FUNCIÓN PARA DIBUJAR CARTAS, RECIBE UN ARRAY DE EVENTOS Y LA UBICACIÓN EN EL HTML
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


//TEMA FILTROS
//FUNCIÓN PARA CREAR CHECKBOXES EN EL HTML, RECIBE UN ARRAY QUE CONTIENE ÚNICAMENTE LAS CATEGORÍAS A SER MOSTRADAS Y UNA UBICACIÓN EN EL HTML
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


//
//FUNCIÓN PARA DETAILS
//FUNCIÓN PARA CREAR UNA ÚNICA CARTA DE DETALLES EN DETAILS.HTML; RECIBE UN EVENTO EN PARTICULAR Y SU UBICACIÓN EN EL HTML
function detailCard(event, container) {
    container.innerHTML = `
    <div class="img-container d-flex justify-content-center">
                <img src="${event.image}" alt="S${event.description}">
            </div>
            <div class="description mx-auto">
                <h5>${event.name}</h5>
                <h6>Date: ${event.date}</h6>
                <h6>Description: ${event.description}</h6>
                <h6>Category: ${event.category}</h6>
                <h6>Place: ${event.place}</h6>
                <h6>Capacity: ${event.capacity}</h6>
                <h6>Assistance or estimate: ${event.assistance}</h6>
                <h6>Price: ${event.price}</h6>
            </div>
    `
}


//
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

export {pastEvents, upcomingEvents, cards, createCheckboxes, checkboxFilter, searchBarFilter, eventStatsByName, drawTd, eventsStatsByCategory, drawTdExpanded, detailCard}