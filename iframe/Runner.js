import systemCallExecutor from "../core/SystemCallExecutor.js";

const runner = (payload, command) =>
  new Promise(resolve => {
    const iframe = document.getElementById("commandWindow");
    let output = [];
    window.onmessage = e => {
      if (e.source !== iframe.contentWindow) return;
      if (e.data[0] === "exit") resolve(output);
      else {
        output = systemCallExecutor(output, e.data[0], e.data.slice(1));
      }
    };
    iframe.src = command;
    iframe.onload = () => {
      iframe.contentWindow.postMessage(["stdin", payload], "*");
    };
  });

export default runner;
