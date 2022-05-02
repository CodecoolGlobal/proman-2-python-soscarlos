import {domManager} from "./view/domManager.js";

export function showInputField() {
        let inputDiv =
        `
        <div class="inputDiv">
            <input placeholder="Choose board title" id="user-input"></input>
            <button id="input-button">Add</button>
        </div>
        `
        domManager.addChild("#root", inputDiv);
}

export let anotherButton = document.querySelector("#add-board");

domManager.addEventListener(
    `#root`,
    "click",
    getUserInput
);

function getUserInput(e) {
        let button = e.target;
        let inputField = button.previousElementSibling;
        let userInput = inputField.value;
        console.log(userInput);
        // call async function to save in database
}