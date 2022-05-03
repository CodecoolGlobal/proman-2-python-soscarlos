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
    return `<div class="board-container">
                <div class="board" data-board-id="${board.id}"></div>
                <span class="board-title" data-board-id="${board.id}">${board.title}</span>
                <input class="board-title-input" data-board-id="${board.id}" type="text" value="${board.title}">
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

