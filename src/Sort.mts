import { Step } from "./StepHistory.mjs";
import { VerticalBar } from "./VerticalBar.mjs";

export function* BubbleSort(nodes: VerticalBar[]) {
  yield { i: -1, j: -1, type: "started", msg: Step.started };
  yield { i: -1, j: -1, type: "summary", msg: Step.summary };

  for (let i = 0; i < nodes.length; i++) {
    yield { i, j: -1, type: "newPass", msg: Step.newPass(i + 1) };

    for (let j = 1; j < nodes.length - i; j++) {
      nodes[j - 1].active();
      nodes[j].active();

      yield { i, j, type: "compare", msg: Step.compare };
      if (nodes[j - 1].height > nodes[j].height) {
        VerticalBar.swap(nodes[j - 1], nodes[j]);
        [nodes[j - 1], nodes[j]] = [nodes[j], nodes[j - 1]];
        yield { i, j, type: "swap", msg: Step.swap };
      }

      nodes[j - 1].inactive();
      nodes[j].inactive();
    }

    yield {
      i,
      j: -1,
      type: "finishedPass",
      msg: Step.finishedPass(i + 1, nodes),
    };
  }

  return { i: -1, j: -1, type: "finished", msg: Step.finished };
}
