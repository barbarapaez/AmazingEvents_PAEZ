import data from "./amazing.js"
import  {Cards} from "./functions.js";

let element = document.getElementById("cardElement");
Cards(data.events, element);

