import {dataHandler} from "./data/dataHandler.js";

const dragged = {
    cardId: null,
    oldStatusId: null,
    newStatusId: null,
}

export function initDragAndDrop() {
    const draggables = document.querySelectorAll(".card");
    const containers = document.querySelectorAll(".board-column-content");

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            dragged.cardId = draggable.getAttribute("data-card-id");
            dragged.oldStatusId = draggable.getAttribute("data-status-id");
            draggable.classList.add('dragging');
        });

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
            dragged.newStatusId = draggable.parentElement.getAttribute("data-status-id");
            if (dragged.newStatusId != dragged.oldStatusId) {
                dataHandler.updateStatusId(dragged.cardId, dragged.newStatusId, dragged.oldStatusId);
            }
            console.log(dragged.cardId, dragged.newStatusId, dragged.oldStatusId);
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