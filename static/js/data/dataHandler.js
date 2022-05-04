export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet("/api/statuses");
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function createBoard(boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        boardTitle = {title: boardTitle}
        return await apiPost("/api/boards/create", boardTitle);

    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    createNewStatus: async function (statusTitle) {
        statusTitle = {title: statusTitle};
        return await apiPost('/api/statuses/create', statusTitle);
    },
    updateBoardTitle: async function (boardTitle, boardId) {
        // changes title of board, saves it and calls the callback function with its data
        boardTitle = {title: boardTitle}
        return await apiPut(`/api/boards/${boardId}`, boardTitle);
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {

    await fetch(url, {
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });


}

async function apiDelete(url) {
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return console.log(response.ok);
    }
}

async function apiPatch(url) {
}
