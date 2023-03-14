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
function detailPage(data, container){
    const queryString = location.search;
    const params = new URLSearchParams(queryString);
    const id = params.get("id");
    const event = data.find(event => event.id == id);
    const fragment = document.createDocumentFragment();
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="img-container d-flex justify-content-center">
        <img src="${event.image}" alt="Screening of La la land in a patio setting">
    </div>
    <div class="description mx-auto">
        <h5>Cinema/Example</h5>
        <h6>Date: ${event.date}</h6>
        <h6>Description: ${event.description}</h6>
        <h6>Category: ${event.category}</h6>
        <h6>Place: ${event.place}</h6>
        <h6>Capacity: ${event.capacity}</h6>
        <h6>Assistance or estimate: ${event.assistance}</h6>
        <h6>Price: ${event.price}</h6>
    </div>
    `
    container.appendChild(fragment);
}
function Cards(arr, container) {
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
                    <a href="../pages/details.html?id=${event.id}" class="btn card-btn card link">
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




export {pastEvents, upcomingEvents, Cards, detailPage}