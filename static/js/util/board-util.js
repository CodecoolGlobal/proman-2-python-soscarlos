import {util} from "./util.js"
import {dataHandler} from "../data/dataHandler.js";
import {boardsManager} from "../controller/boardsManager.js";
import {initDragAndDrop} from "../dragAndDrop.js";
import {createInputField} from "../getUserInput.js";
import {cardsManager} from "../controller/cardsManager.js";


export function showHideButtonHandler(e) {
    const boardId = e.currentTarget.dataset.boardId;
    const columnsDiv = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
    const addBtn = document.querySelector(`.board-add[data-board-id="${boardId}"]`);
    columnsDiv.classList.toggle("hidden");
    addBtn.classList.toggle("hidden");
    showNewStatusInput(e);
}

function showNewStatusInput(e) {
    const board = e.currentTarget.parentElement.parentElement;
    const boardId = board.dataset.boardId;
    const newColumnBtn = board.querySelector("#add-column");

    newColumnBtn.addEventListener("click", function (e) {
        createNewStatus(e, boardId);
    });
    newColumnBtn.classList.toggle("hidden");

}

async function createNewStatus(e, boardId) {
    e.target.disabled = true;
    let columnTitleInput = document.createElement("input");
    let addBtn = document.createElement("button");
    addBtn.textContent = "Add Status"
    columnTitleInput.setAttribute('class', 'colTitleInput');
    e.target.appendChild(columnTitleInput);
    e.target.appendChild(addBtn);

    document.addEventListener("click",
        (event) => util.clickOutsideHandler(addBtn, columnTitleInput, e.target, event));

    addBtn.addEventListener("click", function (e) {
        addNewColumn(e, boardId);
    });
}

async function addNewColumn(e, boardId) {
    let newStatusTitle = e.currentTarget.previousElementSibling.value;
    const btn = e.target;
    const inputField = btn.previousElementSibling;
    if (newStatusTitle) {
        btn.classList.toggle("hidden");
        inputField.classList.toggle("hidden");
        await dataHandler.createNewStatus(newStatusTitle, boardId);
        util.clearColumnsContainer(boardId);
        await boardsManager.loadStatuses(+boardId);
        await initDragAndDrop();
    }
}

export function showTitleInput() {
    let addBoard = document.querySelector("#show-input");
    addBoard.addEventListener('click', createInputField);

}

export function showEditTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let textElement = clickEvent.target,
        inputElement = textElement.nextSibling.nextSibling,
        inputs = document.getElementsByClassName('board-title-input'),
        textTitles = document.getElementsByClassName('board-title');
    for (let index = 0; index < inputs.length; index++) {

        let inputId = inputs[index].getAttribute('data-board-id'),
            titleId = textTitles[index].getAttribute('data-board-id');

        if (inputId === boardId && titleId === boardId) {
            inputs[index].classList.remove('hidden');
            textTitles[index].classList.add('hidden');
            inputs[index].focus();
            inputs[index].select();
        }
    }
    document.addEventListener("click",
        (event) => showHideHandler(textElement, inputElement, boardId, event));

    inputElement.addEventListener('keypress', async function (event) {
        if (event.key === 'Enter') {
            let newTitle = inputElement.value;
            textElement.innerText = newTitle;
            await dataHandler.updateBoardTitle(newTitle, boardId);
            inputElement.classList.add('hidden');
            textElement.classList.remove('hidden');
        }
    });
}

function showHideHandler(textElement, inputElement, boardId, event) {
    let clickElement = event.target,
        inputElementId = inputElement.getAttribute('data-board-id');
    do {
        if (textElement === clickElement || clickElement === inputElement) {
            return;
        }
        textElement.classList.remove('hidden');

        clickElement = clickElement.parentNode;
        if (inputElementId === boardId) {
            inputElement.classList.add('hidden');
        }
    } while (clickElement);
}

export function addCardHandler(event) {
    const boardId = event.currentTarget.dataset.boardId;
    cardsManager.addCard(event, boardId);
}

export async function deleteBoard(boardId) {
    let boardContent = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
    if (boardContent.hasChildNodes()) {
        const statuses = [...boardContent.children];
        for (let status of statuses) {
            let statusId = status.dataset.statusId;
            await deleteStatusHandler(boardId, statusId, true);
        }
    }
    await dataHandler.deleteBoards(boardId);
    await util.clearRootContainer();
    await boardsManager.loadBoards();
    await initDragAndDrop();
}

export async function deleteStatusHandler(boardId, statusId, deleteBoard = false) {
    let columnContent = document.querySelector(`.board-column-content[data-status-id="${statusId}"]`);
    if (columnContent.hasChildNodes()) {
        let cards = columnContent.children;
        for (let card of cards) {
            let cardId = card.dataset.cardId;
            await dataHandler.deleteCard(cardId);
        }
    }
    await dataHandler.deleteStatus(statusId);
    if (!deleteBoard) {
        util.clearColumnsContainer(boardId);
        await boardsManager.loadStatuses(+boardId);
        await initDragAndDrop();
    }
}