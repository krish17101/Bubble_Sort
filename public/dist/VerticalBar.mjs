export class VerticalBar {
    constructor(height, left) {
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
    moveTo(left) {
        this.left = left;
        this.node.style.left = left + "px";
    }
    background(color) {
        this.node.style.backgroundColor = color;
    }
    reset() {
        this.node.classList.remove("active");
        this.node.style.background = "";
    }
    static swap(left, right) {
        const prevLeft = left.left;
        left.moveTo(right.left);
        right.moveTo(prevLeft);
    }
    static from(data) {
        const f = 300 / Math.max.apply(null, data);
        return data.map((height, pos) => new VerticalBar(f * height, 40 * pos));
    }
}
