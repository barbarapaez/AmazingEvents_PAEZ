import data from "./amazing.js"
import  {pastEvents, Cards} from "./functions.js";
let element = document.getElementById("cardElement");
Cards(pastEvents(data.events, data.currentDate), element);

