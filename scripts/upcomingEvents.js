import data from "./amazing.js"
import  {upcomingEvents, Cards} from "./functions.js";
let element = document.getElementById("cardElement");
Cards(upcomingEvents(data.events, data.currentDate), element);

