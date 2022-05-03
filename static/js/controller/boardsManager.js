import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
    },
    updateBoard: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            domManager.addEventListener(`.board-title[data-board-id="${board.id}"]`,
                "click",
                showEditTitle)
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
//    TODO hide cords function
}

function logFunction() {
    console.log("click on title");
}

function showEditTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let textElement = clickEvent.target;
    let inputElement = textElement.nextSibling.nextSibling;
    let inputs = document.getElementsByClassName('board-title-input');
    let textTitles = document.getElementsByClassName('board-title')
    for (let index = 0; index < inputs.length; index++) {
        let inputId = inputs[index].getAttribute('data-board-id');
        let titleId = textTitles[index].getAttribute('data-board-id')
        if (inputId === boardId && titleId === boardId) {
            inputs[index].style.display = 'block';
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
          textElement.style.display = 'block';
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
      textElement.style.display = 'block';
        }
    });
}