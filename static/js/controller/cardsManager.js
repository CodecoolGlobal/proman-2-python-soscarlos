import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";
import {util} from "../util/util.js";
import {initDragAndDrop} from "../dragAndDrop.js";

export let cardsManager = {
    loadCards: async function (boardId, statusId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            if (card.status_id === statusId) {

                domManager.addChild(
                    `.board-column-content[data-board-id="${boardId}"][data-status-id="${statusId}"]`, content);

                domManager.addEventListener(
                    `.card-remove[data-card-id="${card.id}"]`,
                    "click",
                    deleteButtonHandler
                );
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
    }
};

async function createCard(event) {
    let saveButton = event.target;
    const statusId =
        saveButton.parentElement.parentElement.nextElementSibling.firstElementChild.getAttribute("data-status-id");
    let addInput = saveButton.previousSibling,
        cardName = addInput.value,
        boardId = saveButton.parentElement.dataset.boardId,
        statusContainer = document.querySelector(`.board-column-content[data-board-id="${boardId}"][data-status-id="${statusId}"]`),
        cardsAmount = statusContainer.childElementCount,
        cardOrder = cardsAmount + 1;
    await dataHandler.createNewCard(cardName, boardId, statusId, cardOrder);
    saveButton.classList.toggle('hidden');
    addInput.classList.toggle('hidden');
    const addButton = saveButton.parentElement;
    addButton.disabled = false;
    util.clearColumnsContainer(boardId);
    await boardsManager.loadStatuses(+boardId);
    await initDragAndDrop();
}

async function deleteButtonHandler(e) {
    const cardId = e.currentTarget.dataset.cardId;
    const boardId = e.currentTarget.parentElement.parentElement.dataset.boardId;
    await dataHandler.deleteCard(cardId);
    util.clearColumnsContainer(boardId);
    await boardsManager.loadStatuses(+boardId);
    await initDragAndDrop();
}
