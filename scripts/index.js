import data from "./amazing.js"
import  {Cards, detailPage} from "./functions.js";

let element = document.getElementById("cardElement");
Cards(data.events, element);

