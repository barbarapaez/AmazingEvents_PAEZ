import data from "./amazing.js"
import  {upcomingEvents, cards} from "./functions.js";
let element = document.getElementById("cardElement");
cards(upcomingEvents(data.events, data.currentDate), element);

