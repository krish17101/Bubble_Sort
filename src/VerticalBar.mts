export class VerticalBar {
  height: number;
  left: number;
  node: HTMLDivElement;

  constructor(height: number, left: number) {
    this.height = height;
    this.left = left;

    this.node = document.createElement("div");
    this.node.className = "bar";
    this.node.style.height = this.height + "px";
    this.node.style.left = this.left + "px";
  }

  render() {
    return this.node;
  }

  active() {
    this.node.classList.add("active");
  }

  inactive() {
    this.node.classList.remove("active");
  }

  moveTo(left: number) {
    this.left = left;
    this.node.style.left = left + "px";
  }

  background(color: string) {
    this.node.style.backgroundColor = color;
  }

  reset() {
    this.node.classList.remove("active");
    this.node.style.background = "";
  }

  static swap(left: VerticalBar, right: VerticalBar) {
    const prevLeft = left.left;

    left.moveTo(right.left);
    right.moveTo(prevLeft);
  }

  static from(data: number[]) {
    const f = 300 / Math.max.apply(null, data);
    return data.map((height, pos) => new VerticalBar(f * height, 40 * pos));
  }
}
