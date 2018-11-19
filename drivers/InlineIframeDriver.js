import Runtime from "../core/Runtime.js";

const inlineIframeDriver = () => {
  const iframe = document.createElement("iframe");
  const containers = document.querySelectorAll("html, body");
  Array.from(containers).forEach(ct => {
    ct.style.margin = 0;
    ct.style.padding = 0;
  });
  iframe.style.border = "none";
  iframe.style.width = "100vw";
  iframe.style.height = "100vh";
  document.body.appendChild(iframe);
  return (payload, command) =>
    new Promise((resolve, reject) => {
      const runtime = new Runtime();
      runtime.onerror = reject;
      runtime.onload = resolve;
      window.onmessage = e => {
        if (e.source !== iframe.contentWindow) return;
        runtime.postMessage(e.data);
      };
      iframe.src = command;
      iframe.onload = () => {
        iframe.contentWindow.postMessage(["stdin", payload], "*");
      };
    });
};

export default inlineIframeDriver;
