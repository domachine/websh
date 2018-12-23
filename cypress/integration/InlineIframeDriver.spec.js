describe("InlineIframeDriver", () => {
  const websh = () =>
    cy
      .window()
      .its("Websh")
      .then(Websh => Websh());

  beforeEach(() => cy.visit("http://localhost:5000/fixtures/testbed"));

  it("Executes a sample script", () => {
    const script = "echo?text=Foo | sed?regex=Foo&replace=Bar | cat";

    websh()
      .then(executeScript => executeScript(script))
      .then(result => expect(result).to.deep.equal([["Bar"]]));
  });

  it("Executes a sample script and passes two-lined output correctly", () => {
    const script = "output-two-lines?first=Foo&second=Bar | cat";

    websh()
      .then(executeScript => executeScript(script))
      .then(result => expect(result).to.deep.equal([["Foo", "Bar"]]));
  });

  it("Rejects the promise if a command fails", () => {
    websh().then(websh =>
      websh("fail | echo?text=Foo").then(
        () => {
          throw new Error("Expected failure");
        },
        () => {}
      )
    );
  });

  it("Renders only one iframe for multiple executions", () => {
    websh().then(websh => websh("echo").then(() => websh("echo")));

    cy.get("iframe").should("have.lengthOf", 1);
  });

  it("Styles the iframe to full size", () => {
    websh()
      .get("iframe")
      .should(
        "have.attr",
        "style",
        "border: none; width: 100vw; height: 100vh;"
      )
      .get("html")
      .should("have.attr", "style", "margin: 0px; padding: 0px;")
      .get("body")
      .should("have.attr", "style", "margin: 0px; padding: 0px;");
  });

  it("Executes a script with an if-statement", () => {
    websh()
      .then(websh =>
        websh(
          "echo?text=Good | if fail; then echo?text=Not good | cat; else cat; fi"
        )
      )
      .then(result => expect(result).to.deep.equal([["Good"]]));
  });
});
