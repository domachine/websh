class Runtime {
  constructor() {
    this.output = [];
    this.commands = {
      exit: exitCode => {
        if (exitCode) this.onerror(new Error("Script failed"));
        else this.onload(this.output);
      },

      print: (...args) => {
        this.output = this.output.concat(args);
      }
    };
  }

  handleMessage(msg) {
    const command = this.commands[msg[0]];
    if (command) {
      command.apply(this, msg.slice(1));
      return true;
    }
  }
}

export default Runtime;
