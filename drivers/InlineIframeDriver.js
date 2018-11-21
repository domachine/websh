import iframeDriver from "./IframeDriver.js";

const createIframe = () => {
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
  return iframe;
};

const inlineIframeDriver = () => iframeDriver(createIframe());

export default inlineIframeDriver;
