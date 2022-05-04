import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        console.log(cards);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
        }
    },
    addCard: async function (event, boardId) {
        event.target.disabled = true;
        let addCardInput = document.createElement('input');
        let addCardInputButton = document.createElement('button');
        addCardInputButton.textContent = "Save card";
        event.target.appendChild(addCardInput);
        event.target.appendChild(addCardInputButton);
        addCardInputButton.addEventListener("click", createCard)

    }
};

async function createCard(event) {
    let saveButton = event.target,
        addInput = saveButton.previousSibling,
        cardName = addInput.value,
        defaultStatusId = 1,
        boardId = saveButton.parentElement.dataset.boardId;
    await dataHandler.createNewCard(cardName, boardId, defaultStatusId);
    saveButton.classList.toggle('hidden');
    addInput.classList.toggle('hidden');
    console.log(saveButton, addInput);
}

function deleteButtonHandler(clickEvent) {
}
