describe("InlineIframeDriver", () => {
  it("Executes a sample script", () => {
    const script =
      "fixtures/echo?text=Foo | fixtures/sed?regex=Foo&replace=Bar | fixtures/cat";

    cy.visit("http://localhost:5000")
      .window()
      .invoke("Websh", script)

      .then(result => expect(result).to.deep.equal([["Bar"]]));
  });

  it("Executes a sample script and passes two-lined output correctly", () => {
    const script =
      "fixtures/output-two-lines?first=Foo&second=Bar | fixtures/cat";

    cy.visit("http://localhost:5000")
      .window()
      .invoke("Websh", script)

      .then(result => expect(result).to.deep.equal([["Foo", "Bar"]]));
  });

  it("Rejects the promise if a command fails", () => {
    cy.visit("http://localhost:5000")
      .window()
      .then(win =>
        win.Websh("fixtures/fail | fixtures/echo?text=Foo").then(
          () => {
            throw new Error("Expected failure");
          },
          () => {}
        )
      );
  });

  it("Renders only one iframe for multiple executions", () => {
    cy.visit("http://localhost:5000")
      .window()
      .then(win => win.Websh("fixtures/echo"))
      .window()
      .then(win => win.Websh("fixtures/echo"));
    cy.get("iframe").should("have.lengthOf", 1);
  });
});
