const renderTestName = testName => {
  const div = document.createElement("div");
  div.innerText = testName;
  document.body.appendChild(div);
  return div;
};

const makeRed = node => {
  node.style.color = "red";
};

const makeGreen = node => {
  node.style.color = "green";
};

const test = async (testName, fn) => {
  const testNode = renderTestName(testName);
  makeRed(testNode);
  console.log(testName);
  await fn();
  makeGreen(testNode);
};

export default test;
