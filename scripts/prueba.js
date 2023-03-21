const element = document.getElementById("cardElement");
/* fetch("../data/amazing.json").then(response => response.json()).then(data => console.log(data.events))
 */
let eventList = []
function getEvents(){
    fetch("../data/amazing.json")
    .then(response => response.json())
    .then(data => {
        eventList = data.events
        drawCards(eventList, element)


    }).catch(err=>console.error(err))
} getEvents()

function drawCards(arr, conatiner){
    conatiner.innerHTML = ''
    let fragment = document.createDocumentFragment()
    arr.forEach(element => {
        let div = document.createElement('div')
        div.classList = ''
        div.innerHTML = `
        <div class="card h-100" style="width: 16rem;">
            <img src="${element.image}" class="card-img-top" alt="${element.name}">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="card-text">${element.description}</p>
                <div class="card-footer bg-transparent d-inline-flex">
                    <p class="card-text price">Price $${element.price}</p>
                    <a href="../pages/details.html?id=${element._id}" class="btn card-btn card link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
        ` 
        fragment.appendChild(div)
    })
    conatiner.appendChild(fragment)
}
