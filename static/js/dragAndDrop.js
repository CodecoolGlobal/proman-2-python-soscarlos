import {dataHandler} from "./data/dataHandler.js";

const dom = {
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    columns: null,
    cards: null,
};

const currentCard = {
    dragged: null,
    statusId: null,
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
    const currentColumn = currentCard.dragged.parentElement;
    const currentColumnId = currentColumn.getAttribute("data-status-id");
    currentCard.statusId = currentColumnId;
    console.log("Drag start of", currentCard.dragged);
}

function handleDragEnd() {
    // highlightCardSlots(false);
    this.classList.remove('dragged');
    // ui.mixedCardsContainer.classList.toggle('active');
    const cardId = currentCard.dragged.getAttribute("data-card-id");
    const newColumn = currentCard.dragged.parentElement;
    const newColumnId = newColumn.getAttribute("data-status-id");
    dataHandler.updateStatusId(cardId, newColumnId, currentCard.statusId);
    console.log("Drag end of", currentCard.dragged);
    currentCard.dragged = null;
    currentCard.statusId = null;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
    // if (this.classList.contains('mixed-cards')) {
    //     this.classList.toggle('on-top');
    // } else if (checkSlot(e)) {
    //     this.classList.add('over-correct-zone');
    // } else {
    //     this.classList.add('over-incorrect-zone');
    // }
}

function handleDragLeave(e) {
    console.log("Drag leave of", e.currentTarget);
    // if (this.classList.contains('mixed-cards')) {
    //     this.classList.toggle('on-top');
    // } else {
    //     this.classList.remove('over-correct-zone');
    //     this.classList.remove('over-incorrect-zone');
    // }
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);

    if (dom.hasClass(dropzone, "board-column-content")) {
        dropzone.appendChild(currentCard.dragged);
        return;
    }
}