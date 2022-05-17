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
            } else {
                const cardBuilder = htmlFactory(htmlTemplates.card);
                const content = cardBuilder(card, statusId);
                if (card.status_id === statusId) {
                    domManager.addChild(
                    "#modal-content",
                                 content
                    );
                    domManager.addEventListener(
                        `.card-archive[data-card-id="${card.id}"]`,
                        "click",
                        async (event) => archiveButtonHandler(boardId, card.archived, event)
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

async function archiveButtonHandler(boardId, cardArchived, event) {
    let cardId = event.currentTarget.dataset.cardId;
    await dataHandler.updateArchivedStatus(cardId, cardArchived);
    util.clearColumnsContainer(boardId);
    await boardsManager.loadStatuses(+boardId);
    await initDragAndDrop();
}

function showCardInput(e) {
    let textElement = e.target,
        inputElement = e.target.nextElementSibling;
    inputElement.classList.toggle('hidden');
    textElement.classList.toggle('hidden');
    inputElement.focus();
    inputElement.select();
    document.addEventListener(
        "click",
        (event) => clickOutsideCard(textElement, inputElement, event)
    );
    inputElement.addEventListener(
        "keydown",
        (event) => escape(inputElement, textElement, event)
    );
    inputElement.addEventListener(
        "keypress",
         async (event) => updateCardTitle(inputElement, textElement, event)
    );
}

function clickOutsideCard(text, input, event) {
    let eventTarget = event.target;
    if (eventTarget !== text &&
        eventTarget !== input) {
        text.classList.remove('hidden');
        input.classList.add('hidden');
    }
}

function escape(input, text, event) {
    if (event.key === "Escape") {
        text.classList.remove('hidden');
        input.classList.add('hidden');
    }
}

async function updateCardTitle(input, text, event) {
    let newTitle = input.value;
    let cardId = text.dataset.cardId;
    console.log(cardId);
    if (event.key === 'Enter') {
    text.innerHTML = newTitle;
    await dataHandler.updateCardName(cardId, newTitle);
    input.classList.add('hidden');
    text.classList.remove('hidden');
    }
}