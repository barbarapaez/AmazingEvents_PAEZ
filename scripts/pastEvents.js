import data from "./amazing.js"
import  {pastEvents, cards, createCheckboxes} from "./functions.js";
let element = document.getElementById("cardElement");
cards(pastEvents(data.events, data.currentDate), element);
let checkboxElement = document.getElementById("checkboxCreation");
createCheckboxes(data.events, checkboxElement);

