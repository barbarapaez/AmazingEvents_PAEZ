import data from "./amazing.js"
import  {upcomingEvents, cards, createCheckboxes} from "./functions.js";
let element = document.getElementById("cardElement");
cards(upcomingEvents(data.events, data.currentDate), element);
let checkboxElement = document.getElementById("checkboxCreation");
createCheckboxes(data.events, checkboxElement);

