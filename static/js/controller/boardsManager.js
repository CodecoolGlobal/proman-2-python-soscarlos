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
        }
    },

    loadStatuses: loadStatuses,

    showInput: showTitleInput,

    updateBoard: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`,
                "click",
                showEditTitle)
        }
    },
};

function showHideButtonHandler(e) {
    const boardId = e.currentTarget.dataset.boardId;
    const columnsDiv = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
    columnsDiv.classList.toggle("hidden");
    showNewStatusInput(e);
}

function showTitleInput() {
    let addBoard = document.querySelector("#show-input");
    addBoard.addEventListener('click', createInputField);

}

function showEditTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let textElement = clickEvent.target;
    let inputElement = textElement.nextSibling.nextSibling;
    let inputs = document.getElementsByClassName('board-title-input');
    let textTitles = document.getElementsByClassName('board-title');
    for (let index = 0; index < inputs.length; index++) {
        let inputId = inputs[index].getAttribute('data-board-id');
        console.log(inputId);
        let titleId = textTitles[index].getAttribute('data-board-id');
        if (inputId === boardId && titleId === boardId) {
            inputs[index].style.display = 'inline-block'; // consider change the display to show inline
            textTitles[index].style.display = 'none';
        }
    }
    document.addEventListener("click", function(event) {
           let clickElement =   event.target;
        do {
          if(textElement === clickElement || clickElement === inputElement) {
            console.log('click inside');
            return;
          }
          textElement.style.display = 'inline-block'; // consider change the display to show inline
          let inputElementId = inputElement.getAttribute('data-board-id');
          clickElement = clickElement.parentNode;
          if (inputElementId === boardId) {
              inputElement.style.display = 'none';
          }
        } while (clickElement);
        console.log("Clicked outside!");
      });
    inputElement.addEventListener('keypress', async function (event) {
    if (event.key === 'Enter') {
      let newTitle = inputElement.value;
      textElement.innerText = newTitle;
      await dataHandler.updateBoardTitle(newTitle, boardId);
      inputElement.style.display = 'none';
      textElement.style.display = 'inline-block'; // consider change the display to show inline
        }
    });
}

function addCardHandler (event) {
    const boardId = event.currentTarget.dataset.boardId;
    cardsManager.addCard(event, boardId);
}

async function loadStatuses(boardId) {

    const statuses = await dataHandler.getStatuses();
    for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.status);
            const content = columnBuilder(status, boardId);
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
            await cardsManager.loadCards(boardId, status.id);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${boardId}"]`,
                "click",
                showHideButtonHandler
            );
    }
}

function showNewStatusInput(e) {
    const board = e.currentTarget.parentElement.parentElement;
    const newColumnBtn = board.querySelector("#add-column");
    newColumnBtn.addEventListener("click", createNewStatus);
    newColumnBtn.classList.toggle("hidden");

}

function createNewStatus(e) {
    e.target.disabled = true;
    let columnTitleInput = document.createElement("input");
    let addBtn = document.createElement("button");
    addBtn.textContent = "Add Status"
    e.target.appendChild(columnTitleInput);
    e.target.appendChild(addBtn);
    addBtn.addEventListener("click", addNewColumn);
}

async function addNewColumn(e) {
    let newStatusTitle = e.currentTarget.previousElementSibling.value;
    await dataHandler.createNewStatus(newStatusTitle);
    util.clearRootContainer();
    await boardsManager.loadBoards()
}
