import scriptExecutorImpl from "./core/ScriptExecutor.js";
import inlineIframeDriver from "./drivers/InlineIframeDriver.js";

const websh = () => {
  const driver = inlineIframeDriver();
  return src => scriptExecutorImpl(src, driver);
};

export default websh;
