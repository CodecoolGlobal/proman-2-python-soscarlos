import {dataHandler} from "./data/dataHandler.js";

const dom = {
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
    hasId: function (el, id) {
        return el.getAttribute("data-status-id") == id;
    }
};

const ui = {
    columns: null,
    cards: null,
};

const currentCard = {
    dragged: null,
    statusId: null,
    newStatusId: null,
};

export function initDragAndDrop() {
    initElements();
    initDragEvents();
}

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.columns = document.querySelectorAll(".board-column-content");

    ui.cards.forEach(function (card) {
        card.setAttribute("draggable", true);
    });
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.columns.forEach(function (column) {
        initDropzone(column);
    });
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    // highlightCardSlots();
    this.classList.add('dragged');
    // ui.mixedCardsContainer.classList.toggle('active');
    currentCard.dragged = e.currentTarget;
    // this.classList.add(".active");
    const currentColumn = currentCard.dragged.parentElement;
    const currentColumnId = currentColumn.getAttribute("data-status-id");
    currentCard.statusId = currentColumnId;
    console.log("Drag start of", currentCard.dragged);
}

function handleDragEnd() {
    // highlightCardSlots(false);
    this.classList.remove('dragged');
    const cardId = currentCard.dragged.getAttribute("data-card-id");
    const newColumn = currentCard.dragged.parentElement;
    const newColumnId = newColumn.getAttribute("data-status-id");
    currentCard.newStatusId = newColumnId;
    dataHandler.updateStatusId(cardId, newColumnId, currentCard.statusId);
    console.log("Drag end of", currentCard.dragged);
    // this.classList.remove(".active");
    currentCard.dragged = null;
    currentCard.statusId = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
}

function handleDragLeave(e) {
    console.log("Drag leave of", e.currentTarget);
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);
    const current = currentCard.dragged;
    const cards = ui.cards;
    const newStatusId = currentCard.newStatusId;
    const statusCards = [];

    if (dom.hasClass(dropzone, "board-column-content")) {
        dropzone.appendChild(currentCard.dragged);
    }

    cards.forEach(function (card) {
        if (dom.hasId(card, newStatusId)) {
            console.log("yayyyyyyy");
        }
    });

    // ui.cards.forEach(function (card) {
    //     if (card != current) {
    //         let currentPos = 0, droppedPos = 0;
    //         for (let it=0; it<cards.length; it++) {
    //             if (current == cards[it]) { currentPos = it; }
    //             if (card == cards[it]) { droppedPos = it; }
    //         }
    //         if (currentPos < droppedPos) {
    //             card.parentNode.insertBefore(current, card.nextSibling);
    //         } else {
    //             card.parentNode.insertBefore(current, card);
    //         }
    //     }
    // });
}