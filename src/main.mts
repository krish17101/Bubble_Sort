import { BubbleSort } from "./Sort.mjs";
import { Step, StepHistory, StepHistoryItem } from "./StepHistory.mjs";
import { countBubbleSortSteps, draw, getRandomData } from "./utils.mjs";
import { VerticalBar } from "./VerticalBar.mjs";

const state = {
  data: [],
  bars: [],
  step: 0,
  totalSteps: 0,
  history: new StepHistory({ i: -1, j: -1, type: "started", step: 0 }),
};

const onRestart = () => {
  next.removeEventListener("click", onRestart);
  init();
};

function handleColor({ i, j, type }: StepHistoryItem) {
  state.bars.forEach((bar) => bar.reset());

  switch (type) {
    case "swap":
    case "compare":
      state.bars[j - 1].active();
      state.bars[j].active();
    case "newPass":
      for (let x = state.bars.length - i; x < state.bars.length; x++) {
        state.bars[x].background("#4caf50");
      }
      break;
    case "finishedPass":
      for (let x = state.bars.length - i - 1; x < state.bars.length; x++) {
        state.bars[x].background("#4caf50");
      }
      break;
    case "finished":
      state.bars.forEach((bar) => bar.background("#4caf50"));
  }
}

function setDescription({ type, i, step }: StepHistoryItem) {
  switch (type) {
    case "newPass":
      description.textContent = Step[type](i + 1);
      break;
    case "finishedPass":
      description.textContent = Step[type](i + 1, state.bars);
      break;
    default:
      description.textContent = Step[type];
  }

  state.step = step;
  showStep.textContent = `${state.step} / ${state.totalSteps}`;
}

const handleRedo = () => {
  const { type, j } = state.history.redo();

  if (type === "swap") {
    VerticalBar.swap(state.bars[j - 1], state.bars[j]);
    [state.bars[j - 1], state.bars[j]] = [state.bars[j], state.bars[j - 1]];
  }

  handleColor(state.history.current);
  setDescription(state.history.current);

  if (state.step === state.totalSteps) {
    next.removeEventListener("click", onNext);
    next.addEventListener("click", onRestart);
    next.textContent = "🔁 Restart";
  }
};

const onPrev = () => {
  if (state.step === state.totalSteps) {
    next.textContent = "Next ➡️";
    next.removeEventListener("click", onRestart);
    next.addEventListener("click", onNext);
  }

  const { type, j } = state.history.current;

  if (type === "swap") {
    VerticalBar.swap(state.bars[j - 1], state.bars[j]);
    [state.bars[j - 1], state.bars[j]] = [state.bars[j], state.bars[j - 1]];
  }

  state.history.undo();

  handleColor(state.history.current);
  setDescription(state.history.current);
};

const onNext = () => {
  if (state.history.stackRedo.length > 0) {
    handleRedo();
    return;
  }

  // @ts-ignore
  const step = state.sorter.next();

  if (!step) return;

  state.history?.push({
    i: step.value.i,
    j: step.value.j,
    // @ts-ignore
    type: step.value.type,
    step: state.step + 1,
  });

  description.textContent = step.value.msg;

  showStep.textContent = `${++state.step} / ${state.totalSteps}`;

  if (step?.done) {
    next.removeEventListener("click", onNext);
    next.addEventListener("click", onRestart);
    next.textContent = "🔁 Restart";
  }
};

const description = document.getElementById("description") as HTMLDivElement;
const showStep = document.getElementById("atStep") as HTMLSpanElement;
const prev = document.getElementById("prev") as HTMLButtonElement;
const next = document.getElementById("next") as HTMLButtonElement;

function init() {
  state.data = getRandomData();
  state.bars = VerticalBar.from(state.data);
  state.step = 0;
  state.totalSteps = countBubbleSortSteps([...state.data]);
  state.history = new StepHistory({ i: -1, j: -1, type: "started", step: 0 });
  // @ts-ignore
  state.sorter = BubbleSort(state.bars);

  const graph = document.querySelector(".graph") as HTMLElement;
  graph.style.width = 40 * state.data.length - 8 + "px";

  draw(state.bars, graph);

  // @ts-ignore
  const step = state.sorter.next();
  description.textContent = step.value.msg;

  next.textContent = "Next ➡️";
  next.addEventListener("click", onNext);
  prev.addEventListener("click", onPrev);

  showStep.textContent = `${state.step} / ${state.totalSteps}`;
}

document.addEventListener("DOMContentLoaded", init);
