export let util = {
    clearRootContainer: function () {
    let container = document.querySelector("#root");
    container.innerHTML = "";
    },
    clickOutsideHandler: function (btn, input, outerTarget, event) {
        let clickElement = event.target;
          if(clickElement !== btn &&
            clickElement !== input &&
          clickElement !== outerTarget) {
              console.log('we are inside');
              outerTarget.removeChild(input);
              outerTarget.removeChild(btn);
              outerTarget.disabled = false;
          } console.log('we are OUT');
    },
    clearColumnsContainer: function (boardId) {
        let container = document.querySelector(`.board-columns[data-board-id="${boardId}"]`);
        container.innerHTML = "";
    }
}