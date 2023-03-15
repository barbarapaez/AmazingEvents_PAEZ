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

export {pastEvents, upcomingEvents, cards, createCheckboxes}