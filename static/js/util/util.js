import {dataHandler} from "../data/dataHandler.js";

export let util = {
    clearRootContainer: function () {
    let container = document.querySelector("#root");
    container.innerHTML = "";
    },
    showEdit: function (event) {
    let textDiv = event.target,
        inputDiv = event.target.nextSibling.nextSibling;
    textDiv.classList.add('hidden');
    inputDiv.classList.remove('hidden');
    document.addEventListener('click',
        (event) => util.clickOutsideTitle(textDiv, inputDiv, event));
    inputDiv.addEventListener('keypress',
        async (event) => util.updateTitle(textDiv, inputDiv, event));
    },
    clickOutsideHandler: function (btn, input, outerTarget, event) {
        let clickElement = event.target;
          if(clickElement !== btn &&
            clickElement !== input &&
          clickElement !== outerTarget) {
              console.log('we are inside');
              outerTarget.removeChild(input);
              outerTarget.removeChild(btn);
              outerTarget.disabled = false;
          } console.log('we are OUT');
    },
    clickOutsideTitle: function (textElement, inputElement, event) {
    let clickItem = event.target;
          if(clickItem !== textElement &&
            clickItem !== inputElement) {
              textElement.classList.remove('hidden');
              inputElement.classList.add('hidden');
          } console.log('we are OUT');
    },
    updateTitle: async function (textElement, inputElement, event) {
    if (event.key === 'Enter') {
        let statusId = textElement.dataset.statusId;
        textElement.innerText = inputElement.value;
        await dataHandler.updateStatusName(textElement.innerText, statusId);
        inputElement.classList.add('hidden');
        textElement.classList.remove('hidden');
        }
    },
    clearColumnsContainer: function (boardId) {
        let container = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
        container.innerHTML = "";
    }
}