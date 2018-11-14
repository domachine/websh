import runner from "../iframe/Runner.js";

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
  promiseReduce(parseScript(script), runner, null);

const scriptExecutor = createScriptExecutor(runner);

export default scriptExecutor;
