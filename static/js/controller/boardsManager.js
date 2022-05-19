import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {util} from "../util/util.js";
import {
    showHideButtonHandler,
    showTitleInput,
    deleteStatusHandler,
    deleteBoard,
    addCardHandler,
    showEditTitle
} from "../util/board-util.js";
import {callArchiveButton} from "../util/card-util.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);

            await this.loadStatuses(board.id);
            domManager.addEventListener(
                `.board-add[data-board-id="${board.id}"]`,
                "click",
                addCardHandler
            );
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`,
                "click",
                showEditTitle);

            domManager.addEventListener(
                `.board-remove[data-board-id="${board.id}"]`,
                "click",
                async () => deleteBoard(board.id)
            );
        }
    },

    loadStatuses: loadStatuses,

    showInput: showTitleInput,

    callArchiveButton: callArchiveButton,
};

export async function loadStatuses(boardId) {
    const statuses = await dataHandler.getStatuses();
    for (let status of statuses) {
        const columnBuilder = htmlFactory(htmlTemplates.status);
        const content = columnBuilder(status, boardId);
        if (status.board_id === boardId) {
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
            await cardsManager.loadCards(boardId, status.id);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${boardId}"]`,
                "click",
                showHideButtonHandler
            );

            domManager.addEventListener(
                `.board-column-title[data-status-id="${status.id}"]`,
                "click",
                util.showEdit
            );

            domManager.addEventListener(
                `.column-remove[data-status-id="${status.id}"]`,
                "click",
                async () => deleteStatusHandler(boardId, status.id)
            );
        }
    }
}