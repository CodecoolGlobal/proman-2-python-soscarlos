import {dataHandler} from "../data/dataHandler.js";
import {domManager} from "../view/domManager.js";


export let columnManager = {
    loadColumn: async function () {
        const statuses = await dataHandler.getStatuses();
        console.log(statuses);
        for (let status of statuses) {
            const content = buildColumn(status);
            domManager.addChild(".board-columns", content); // here we have to add class + board-id
        }
    },

    updateColumnName: async function () {
        console.log('update column');  // check how to update column names without affecting all statuses
    },
};

function buildColumn(column) {
    return `
            <div class="board-column">
                <div class="board-column-title" data-column-id="${column.id}">${column.title}</div>
                <input class="board-column-title-input" data-column-id="${column.id}" type="text" value="${column.title}">
                <div class="board-column-content"></div>
                </div>
            </div>
            `;
}