import data from "./amazing.js"

/* let detailId = document.getElementById("detailCard");
 */
const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
let events = []
events = data.events
console.log(events)
const event = events.find(element => element._id == id);


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