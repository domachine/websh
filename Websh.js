import scriptExecutorImpl from "./core/ScriptExecutor.js";
import inlineIframeDriver from "./drivers/InlineIframeDriver.js";
import iframeDriver from "./drivers/IframeDriver.js";

const websh = driver => {
  const driverOrDefault = driver || inlineIframeDriver();
  return src => scriptExecutorImpl(src, driverOrDefault);
};

export { iframeDriver };

export default websh;
