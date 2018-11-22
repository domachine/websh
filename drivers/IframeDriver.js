import Runtime from "../core/Runtime.js";

const iframeDriver = iframe => {
  return (payload, command) =>
    new Promise((resolve, reject) => {
      const runtime = new Runtime();
      runtime.onerror = reject;
      runtime.onload = resolve;
      window.onmessage = e => {
        if (e.source !== iframe.contentWindow) return;
        runtime.handleMessage(e.data);
      };
      iframe.src = command;
      iframe.onload = () => {
        iframe.contentWindow.postMessage(["stdin", payload], "*");
      };
    });
};

export default iframeDriver;
