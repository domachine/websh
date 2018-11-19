import inlineIframeDriver from "../drivers/InlineIframeDriver.js";

export const parseScript = script => {
  return script
    .split("|")
    .map(s => s.trim())
    .map(s => (s.startsWith('"') ? JSON.parse(s) : s));
};

export const promiseReduce = (array, fn, seed) =>
  array.reduce(
    (result, element) => result.then(r => fn(r, element)),
    Promise.resolve(seed)
  );

export const createScriptExecutor = runner => script =>
  promiseReduce(parseScript(script), runner, []);

const scriptExecutor = createScriptExecutor(inlineIframeDriver());

export default scriptExecutor;
