import {
    GlobalContext
} from "./context.js";


window.onload = function () {
    GlobalContext.onload();
}

window.onresize = function () {
    GlobalContext.onresize();
}
