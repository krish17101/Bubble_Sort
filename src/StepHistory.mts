import type { VerticalBar } from "./VerticalBar.mjs";

export const Step = {
  started: "Starting Bubble Sort!",
  summary:
    "For each pass, we will move left to right swapping adjacent elements as needed.\
     Each pass moves the next largest element into its final position (these will be shown in green).",
  swap: "Swap",
  compare: "Compare Elements",
  newPass: (pass: number) => `Starting Pass ${pass}`,
  finishedPass: (pass: number, nodes: VerticalBar[]) => {
    nodes[nodes.length - pass].background("#4caf50");
    return `Pass ${pass} Done. The last element processed is now in its final position.`;
  },
  finished: `Finished Sorting`,
};

export interface StepHistoryItem {
  i: number;
  j: number;
  step: number;
  type: keyof typeof Step;
}

export class StepHistory {
  stackUndo: StepHistoryItem[] = [];
  stackRedo: StepHistoryItem[] = [];

  current: StepHistoryItem;

  constructor(current: StepHistoryItem) {
    this.current = current;
  }

  push(step: StepHistoryItem) {
    this.stackUndo.push(this.current);
    this.current = step;
  }

  undo() {
    if (this.stackUndo.length > 0) {
      this.stackRedo.unshift(this.current);
      this.current = this.stackUndo.pop() as StepHistoryItem;
    }

    return this.current;
  }

  redo() {
    if (this.stackRedo.length > 0) {
      this.stackUndo.push(this.current);
      this.current = this.stackRedo.shift() as StepHistoryItem;
    }

    return this.current;
  }
}
