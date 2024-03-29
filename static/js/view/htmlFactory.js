export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3,
    archive: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.status]: columnBuilder,
    [htmlTemplates.archive]: modalCardBuilder,
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {

    return `
            <div class="board" data-board-id=${board.id}><br>
                <div class="board-remove" data-board-id="${board.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="board-header" data-board-id="${board.id}">
                      <span class="board-title" data-board-id="${board.id}">${board.title}</span>
                      <input class="board-title-input hidden" data-board-id="${board.id}" type="text" value="${board.title}">
                      <button class="board-add hidden" data-board-id="${board.id}" id="add-card">Add Card</button>
                      <button class="board-add hidden" id="add-column">Add new column</button>
                      <button class="toggle-board-button" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns hidden" data-board-id="${board.id}"></div>
            </div>
`;

}

function cardBuilder(card, statusId) {
    return `<div class="card" data-card-id="${card.id}" data-status-id="${statusId}" draggable="true">
                <div class="card-archive" data-card-id="${card.id}"><i class="fa fa-archive"></i></div>
                <div class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i></div>

                <div class="card-title" data-card-id="${card.id}">${card.title}</div>
            
                <input class="card-title-input hidden" data-board-id="${card.id}" type="text" value="${card.title}"> 
            
            </div>
            `;
}

function modalCardBuilder(card) {
    return `<div class="card archived" data-card-id="${card.id}" data-status-id="${card.status_id}" data-board-id="${card.board_id}" >
                <div class="card-de-archive" data-card-id="${card.id}"><i class="fa fa-archive"></i></div>

                <div class="card-title" data-card-id="${card.id}">${card.title}</div> 
            
            </div>
            `;
}


function columnBuilder(status, boardId) {
    return `
        <div class="board-column" data-status-id=${status.id}>
            
            <div class="board-column-title" data-status-id=${status.id}>${status.title}</div>
            
            <input class="column-title-input hidden" data-board-id="${status.id}" type="text" value="${status.title}">
            
            <div class="column-remove" data-status-id="${status.id}"><i class="fas fa-trash-alt"></i></div>
            
            <div class="board-column-content" data-status-id=${status.id} data-board-id="${boardId}"></div>
        </div>
    `;
}