import {dataHandler} from "./data/dataHandler.js";
import {boardsManager} from "./controller/boardsManager.js";
import {util} from "./util/util.js";
import {initDragAndDrop} from "./dragAndDrop.js";

const inputBtn = document.querySelector("#show-input");
const statuses = ["new", "in progress", "testing", "done"];


export function createInputField() {
        let inputDiv = document.createElement("div");
        inputDiv.setAttribute("id", "inputDiv");
        let input = document.createElement("input");
        let btn = document.createElement("button");
        btn.textContent = "Add";
        btn.addEventListener("click", getUserInput);
        inputDiv.append(input, btn);
        document.querySelector("#user-input").appendChild(inputDiv);
        inputBtn.disabled = true;

}

async function getUserInput(e) {
        let button = e.target;
        let inputField = button.previousElementSibling;
        let userInput = inputField.value;
        deleteInputDiv();
        await dataHandler.createNewBoard(userInput);
        let boards = document.querySelectorAll(".board");
        for (let i=0; i < statuses.length; i++){
                let title = statuses[i];
                let boardId = boards.length + 1;
                await dataHandler.createNewStatus(title, boardId);
        }
        util.clearRootContainer();
        await boardsManager.loadBoards();
        await initDragAndDrop();

        inputBtn.disabled = false;
}

function deleteInputDiv() {
        let inputDiv = document.querySelector("#inputDiv");
        inputDiv.remove();

}