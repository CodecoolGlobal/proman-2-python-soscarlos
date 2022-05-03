import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    boardsManager.loadStatuses();
    boardsManager.showInput();
    boardsManager.updateBoard();
}

init();

