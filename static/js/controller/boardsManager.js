import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {createInputField} from "../getUserInput.js";
import {util} from "../util/util.js";

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
                showEditTitle)
        }
    },

    loadStatuses: loadStatuses,

    showInput: showTitleInput,

};

function showHideButtonHandler(e) {
    const boardId = e.currentTarget.dataset.boardId;
    const columnsDiv = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
    const addBtn = document.querySelector(`.board-add[data-board-id="${boardId}"]`);
    columnsDiv.classList.toggle("hidden");
    addBtn.classList.toggle("hidden");
    showNewStatusInput(e);
}

function showTitleInput() {
    let addBoard = document.querySelector("#show-input");
    addBoard.addEventListener('click', createInputField);

}

function showEditTitle(clickEvent) {
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

function showHideHandler (textElement, inputElement, boardId, event) {
    let clickElement = event.target,
        inputElementId = inputElement.getAttribute('data-board-id');
        do {
          if(textElement === clickElement || clickElement === inputElement) {
            return;
          }
          textElement.classList.remove('hidden');

          clickElement = clickElement.parentNode;
          if (inputElementId === boardId) {
              inputElement.classList.add('hidden');
          }
        } while (clickElement);
        console.log("Clicked outside!");
}

function addCardHandler (event) {
    const boardId = event.currentTarget.dataset.boardId;
    cardsManager.addCard(event, boardId);
}

export async function loadStatuses(boardId) {

    const statuses = await dataHandler.getStatuses();
    for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.status);
            const content = columnBuilder(status, boardId);
            if (status.board_id === boardId){
                domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
                await cardsManager.loadCards(boardId, status.id);
                domManager.addEventListener(
                    `.toggle-board-button[data-board-id="${boardId}"]`,
                    "click",
                    showHideButtonHandler
                );
            }
    }
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

    addBtn.addEventListener("click", function(e) {
        addNewColumn(e, boardId);
    });
}

async function addNewColumn(e, boardId) {
    let newStatusTitle = e.currentTarget.previousElementSibling.value;
    if (newStatusTitle) {
        await dataHandler.createNewStatus(newStatusTitle, boardId);
        util.clearRootContainer();
        await boardsManager.loadBoards()
    }
}
