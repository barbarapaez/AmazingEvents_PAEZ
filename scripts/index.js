import data from "./amazing.js"
import  {cards, createCheckboxes} from "./functions.js";

let element = document.getElementById("cardElement");
cards(data.events, element);
let checkboxElement = document.getElementById("checkboxCreation");
createCheckboxes(data.events, checkboxElement);

