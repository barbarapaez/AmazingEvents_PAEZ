import data from "./amazing.js"
import  {pastEvents, cards} from "./functions.js";
let element = document.getElementById("cardElement");
cards(pastEvents(data.events, data.currentDate), element);

