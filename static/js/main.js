import {boardsManager} from "./controller/boardsManager.js";
import {initDragAndDrop} from "./dragAndDrop.js";
import {initDragDrop} from "./anotherDragAndDrop.js";

async function init() {
    await boardsManager.loadBoards();
    await boardsManager.showInput();
    // initDragAndDrop();
    initDragDrop();
}

init();

