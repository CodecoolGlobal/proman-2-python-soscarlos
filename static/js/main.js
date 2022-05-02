import {boardsManager} from "./controller/boardsManager.js";
import {anotherButton, showInputField} from "./getUserInput.js";

function init() {
    boardsManager.loadBoards();
}

init();

anotherButton.addEventListener("click", showInputField);