export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
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
    return `<div class="board" data-board-id=${board.id}><br>
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add" id="add-card">Add Card</button>
                    <button class="toggle-board-button" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

