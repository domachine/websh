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

export const scriptExecutor = (script, runner) =>
  promiseReduce(parseScript(script), runner, []);

export default scriptExecutor;
