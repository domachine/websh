describe("Websh", () => {
  it("Executes a sample script", () => {
    const script =
      "fixtures/echo?text=Foo | fixtures/sed?regex=Foo&replace=Bar | fixtures/cat";

    cy.visit(`http://localhost:5000?eval=${encodeURIComponent(script)}`);

    cy.get("#commandWindow")
      .should("have.attr", "src", "fixtures/cat")
      .should(iframe => expect(iframe.contents().find("#text")).to.exist)
      .then(iframe => cy.wrap(iframe.contents().find("#text")))
      .should("have.text", '"Bar"');
  });

  it("Executes a sample script and passes two-lined output correctly", () => {
    const script =
      "fixtures/output-two-lines?first=Foo&second=Bar | fixtures/cat";

    cy.visit(`http://localhost:5000?eval=${encodeURIComponent(script)}`);

    cy.get("#commandWindow")
      .should("have.attr", "src", "fixtures/cat")
      .should(iframe => expect(iframe.contents().find("#text")).to.exist)
      .then(iframe => cy.wrap(iframe.contents().find("#text")))
      .should("have.text", '"FooBar"');
  });
});
