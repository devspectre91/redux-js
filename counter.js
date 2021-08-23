(() => {
  let display = document.getElementById("display");

  let increment = document.querySelector(".increment");
  let decrement = document.querySelector(".decrement");
  let reset = document.querySelector(".reset");
  let steps = document.querySelectorAll(".step");
  let maxButtons = document.querySelectorAll(".max");
  let step = 1;
  let max = Infinity;

  let store = Redux.createStore(reducer);
  let counter = store.getState();

  function beautifyButton() {
    steps.forEach((value) => {
      value.innerText === String(step)
        ? null
        : value.classList.remove("is-warning");
    });
    maxButtons.forEach((value) => {
      value.innerText === String(max)
        ? null
        : value.classList.remove("is-warning");
    });
  }

  function reducer(counter = 0, action) {
    switch (action.type) {
      case "increment":
        counter = counter + (action.step || 1);
        return counter > action.max ? counter - (action.step || 1) : counter;
      case "decrement":
        return counter - (action.step || 1);
      case "reset":
        return 0;
      default:
        return counter;
    }
  }
  steps.forEach((value) => {
    value.addEventListener("click", () => {
      step = +value.innerText;
      value.classList.add("is-warning");
      beautifyButton();
    });
  });
  maxButtons.forEach((value) => {
    value.addEventListener("click", () => {
      max = +value.innerText;
      value.classList.add("is-warning");
      beautifyButton();
    });
  });

  increment.addEventListener("click", () => {
    store.dispatch({ type: "increment", step: step, max: max });
    counter = store.getState();
    display.innerText = counter;
  });

  decrement.addEventListener("click", () => {
    store.dispatch({ type: "decrement", step: step });
    counter = store.getState();
    display.innerText = counter;
  });

  reset.addEventListener("click", () => {
    store.dispatch({ type: "reset" });
    counter = store.getState();
    display.innerText = counter;
    step = 1;
    beautifyButton();
  });
})();
