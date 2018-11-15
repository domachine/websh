describe("Websh", () => {
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
});
