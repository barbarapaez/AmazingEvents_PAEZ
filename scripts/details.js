//TRAÍDA DE FUNCIONES NECESARIAS
import  {detailCard} from "./functions.js";

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