import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {createInputField} from "../getUserInput.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            // console.log(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    showInput: showTitleInput
};

function showHideButtonHandler(e) {
    const boardId = e.currentTarget.dataset.boardId;
    cardsManager.loadCards(boardId);
//    TODO hide cords function
}

function showTitleInput() {
    let anotherButton = document.querySelector("#show-input");
    anotherButton.addEventListener('click', createInputField);

}
