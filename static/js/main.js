import {boardsManager} from "./controller/boardsManager.js";

function init() {
    boardsManager.loadBoards();
    boardsManager.showInput();
    boardsManager.updateBoard();
}

init();

