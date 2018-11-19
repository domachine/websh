import scriptExecutorImpl from "./core/ScriptExecutor.js";
import inlineIframeDriver from "./drivers/InlineIframeDriver.js";

const websh = () => src => scriptExecutorImpl(src, inlineIframeDriver());

export default websh;
