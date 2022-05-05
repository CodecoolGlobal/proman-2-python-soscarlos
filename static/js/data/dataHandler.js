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
        let card = {"title": cardTitle,
                    "status_id": statusId,
                    "card_order": 1};
        return await apiPost( `/api/boards/${boardId}/cards/create`, card);
        // creates new card, saves it and calls the callback function with its data
    },
    deleteCard: async function (cardId) {
        let id = {"id": cardId};
      return   await apiDelete(`/api/cards/delete/${cardId}`, id);
    },
    createNewStatus: async function (statusTitle, boardId) {
        let status =
            {
                title: statusTitle,
                board_id : boardId
            };
        return await apiPost('/api/statuses/create', status);
    },
    delete_status: async function(statusId) {
        return await fetch(`/api/statuses/delete/${statusId}`) ;
    },
    updateBoardTitle: async function (boardTitle, boardId) {
        // changes title of board, saves it and calls the callback function with its data
        boardTitle = {title: boardTitle}
        return await apiPut(`/api/boards/${boardId}`, boardTitle);
    },
    updateStatusName: async function (statusName, boardId) {
      return await apiPut("");
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

    let response = await fetch(url, {
        method: "POST",
        headers: {
             "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return console.log(response.ok);
    }
}

async function apiPut(url, payload) {
    let response = await fetch(url, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        return console.log(response.ok);
    }
}

async function apiDelete(url) {
    let response = await fetch(url, {method: "DELETE"});
    console.log(url)
    if (response.ok) {
        return console.log(response.ok);
    }
}


async function apiPatch(url) {
}
