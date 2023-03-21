const element = document.getElementById("detailCard");
let eventList = []
function getEvents(){
    fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
        eventList = data.events
        let params = location.search
        let queryString = new URLSearchParams(params)
        let id = queryString.get("id")
        const event = eventList.find(e => e._id == id)
        detailCard(event, element)

    }).catch(err=>console.error(err))
} getEvents()

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
