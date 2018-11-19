class Runtime {
  constructor() {
    this.output = [];
  }

  postMessage(msg) {
    if (msg[0] === "exit") {
      if (msg[1]) this.onerror(new Error("Script failed"));
      else this.onload(this.output);
    } else if (msg[0] === "print") {
      this.output = this.output.concat(msg.slice(1));
    }
  }
}

export default Runtime;
