const runner = (payload, command) =>
  new Promise(resolve => {
    const iframe = document.getElementById("commandWindow");
    window.onmessage = e => {
      if (e.source !== iframe.contentWindow) return;
      resolve(e.data);
    };
    iframe.src = command;
    iframe.onload = () => {
      iframe.contentWindow.postMessage([payload], "*");
    };
  });

export default runner;
