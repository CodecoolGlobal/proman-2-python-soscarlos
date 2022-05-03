import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        const column = await document.querySelector(".board-column");
        const columnId = column.firstElementChild.getAttribute("data-status-id");
        // the problem here is that not all statuses are being selected and compared
        for (let card of cards) {
            if (card.status_id === columnId) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card);
                domManager.addChild(`.board-column-content[data-status-id="${columnId}"]`, content);
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
