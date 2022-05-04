import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId, statusId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            if (card.status_id === statusId) {
                domManager.addChild(`.board-column-content[data-board-id="${boardId}"][data-status-id="${statusId}"]`, content);
                domManager.addEventListener(
                    `.card[data-card-id="${card.id}"]`,
                    "click",
                    deleteButtonHandler
                );
            }
        }
    },
};

function deleteButtonHandler(clickEvent) {
}
