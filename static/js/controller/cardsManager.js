import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {util} from "../util/util.js";
import {createCard, showCardInput, archiveButtonHandler, deleteButtonHandler} from "../util/card-util.js";

export let cardsManager = {
    loadCards: async function (boardId, statusId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            if (!card.archived) {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card, statusId);
                if (card.status_id === statusId) {
                    domManager.addChild(
                        `.board-column-content[data-board-id="${boardId}"][data-status-id="${statusId}"]`,
                        content
                    );

                    domManager.addEventListener(
                        `.card-archive[data-card-id="${card.id}"]`,
                        "click",
                        async (event) => archiveButtonHandler(boardId, card.archived, event)
                    );

                    domManager.addEventListener(
                        `.card-remove[data-card-id="${card.id}"]`,
                        "click",
                        deleteButtonHandler
                    );

                    domManager.addEventListener(
                        `.card-title[data-card-id="${card.id}"]`,
                        "click",
                        showCardInput
                    );
                }
            }
        }
    },
    addCard: async function (e) {
        e.target.disabled = true;
        let addCardInput = document.createElement('input');
        let addCardInputButton = document.createElement('button');
        addCardInputButton.textContent = "Save card";

        e.target.appendChild(addCardInput);
        e.target.appendChild(addCardInputButton);

        document.addEventListener("click",
            (event) => util.clickOutsideHandler(addCardInputButton, addCardInput, e.target, event));

        addCardInputButton.addEventListener("click", createCard)
    },
};