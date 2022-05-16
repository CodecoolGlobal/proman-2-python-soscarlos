import {dataHandler} from "./data/dataHandler.js";

const dragged = {
    cardId: null,
    oldStatusId: null,
    newStatusId: null,
    cardsInColumnOld: null,
    cardsInColumnNew: null,
    oldPos: null,
}

export function initDragAndDrop() {
    const draggables = document.querySelectorAll(".card");
    const containers = document.querySelectorAll(".board-column-content");

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            dragged.cardId = draggable.getAttribute("data-card-id");
            dragged.oldStatusId = draggable.getAttribute("data-status-id");
            draggable.classList.add('dragging');
            dragged.cardsInColumnOld = [...draggable.parentElement.children];
            dragged.cardsInColumnOld.forEach(function (card) {
                if (card === draggable) {
                    let currentPos = 0;
                    for (let it=0; it<dragged.cardsInColumnOld.length; it++) {
                        if (card === dragged.cardsInColumnOld[it]) { currentPos = it; }
                    }
                    dragged.oldPos = currentPos + 1;
                }
            });
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            dragged.newStatusId = draggable.parentElement.getAttribute("data-status-id");
            if (dragged.newStatusId !== dragged.oldStatusId) {
                dataHandler.updateStatusId(dragged.cardId, dragged.newStatusId, dragged.oldStatusId);
            }
            if (dragged.newStatusId === dragged.oldStatusId) {
                const cardCount = draggable.parentElement.childElementCount;
                dragged.cardsInColumnNew = [...draggable.parentElement.children];
                let newOrderNumber = 0;
                dragged.cardsInColumnNew.forEach(function (card) {
                    if (card === draggable) {
                        let droppedPos = 0;
                        for (let it=0; it<cardCount; it++) {
                            if (card === dragged.cardsInColumnNew[it]) { droppedPos = it; }
                        }
                        newOrderNumber = droppedPos + 1;
                        dataHandler.updateCardOrder(dragged.cardId, newOrderNumber,
                            dragged.oldStatusId, dragged.oldPos);
                    }
                });
            }
            dragged.cardId = null; dragged.oldStatusId = null; dragged.newStatusId = null;
            dragged.oldPos = null; dragged.cardsInColumnOld = null; dragged.cardsInColumnNew = null;
        });

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });
        });

        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child }
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;

        }
    });
}