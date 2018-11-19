import systemCallExecutor from "../core/SystemCallExecutor.js";

const inlineIframeDriver = () => {
  const iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  return (payload, command) =>
    new Promise((resolve, reject) => {
      let output = [];
      window.onmessage = e => {
        if (e.source !== iframe.contentWindow) return;
        if (e.data[0] === "exit") {
          if (e.data[1]) reject(new Error("Script failed"));
          else resolve(output);
        } else {
          output = systemCallExecutor(output, e.data[0], e.data.slice(1));
        }
      };
      iframe.src = command;
      iframe.onload = () => {
        iframe.contentWindow.postMessage(["stdin", payload], "*");
      };
    });
};

export default inlineIframeDriver;
