import type { VerticalBar } from "./VerticalBar.mjs";

export const countBubbleSortSteps = (array: number[]) => {
  let count = 2;

  for (let i = 0; i < array.length; i++) {
    count++;
    for (let j = 1; j < array.length - i; j++) {
      count++;
      if (array[j - 1] > array[j]) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
        count++;
      }
    }
    count++;
  }

  return count;
};

export const getRandomData = (upto = 10, size = 12) => {
  const data = Array(size);

  for (let i = 0; i < data.length; i++) {
    data[i] = Math.floor(Math.random() * upto) + 1;
  }

  return data;
};

export const draw = (bars: VerticalBar[], graph: HTMLElement) => {
  console.log(bars);
  graph.replaceChildren(...bars.map((bar) => bar.render()));
};
