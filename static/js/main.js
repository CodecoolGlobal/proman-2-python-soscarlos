import {boardsManager} from "./controller/boardsManager.js";
import {initDragAndDrop} from "./dragAndDrop.js";

const reloadBtn = document.querySelector("#reload-button");

async function init() {
    await boardsManager.loadBoards();
    await boardsManager.showInput();
    await initDragAndDrop();
}

init();

function reloadPage(){
    window.location.reload();
}

reloadBtn.addEventListener("click", function(){
    reloadPage();
});

