import data from "./amazing.js"
let sortedPastEvents = [];
function pastEvents(events, date) {
    for(let event of events){
        if(event.date<date){
            sortedPastEvents.push(event);
        }
    }
    return sortedPastEvents
}
pastEvents(data.events, data.currentDate)
const element = document.getElementById("cardElement");
const fragment = document.createDocumentFragment();
sortedPastEvents.forEach((event) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card h-100" style="width: 16rem;">
    <img src="${event.image}" class="card-img-top" alt="${event.name}">
    <div class="card-body">
        <h5 class="card-title">${event.name}</h5>
        <p class="card-text">${event.description}</p>
        <div class="card-footer bg-transparent d-inline-flex">
            <p class="card-text price">Price $${event.price}</p>
            <a href="./details.html" class="btn card-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                </svg>
            </a>
        </div>
    </div>
</div>`;
    fragment.appendChild(div);
});
element.appendChild(fragment);