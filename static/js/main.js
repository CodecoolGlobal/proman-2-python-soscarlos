import {boardsManager} from "./controller/boardsManager.js";
import {initDragAndDrop} from "./dragAndDrop.js";

async function init() {
    await boardsManager.loadBoards();
    await boardsManager.showInput();
    await boardsManager.callArchiveButton();
    await initDragAndDrop();
}

init();

