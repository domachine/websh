describe("Websh", () => {
  it("Executes a sample script", () => {
    const script =
      "fixtures/echo?text=Foo | fixtures/sed?regex=Foo&replace=Bar | fixtures/cat";
    cy.visit(
      `http://localhost:5000/prototype?eval=${encodeURIComponent(script)}`
    );
    cy.wait(2000);
    cy.get("#commandWindow")
      .should(iframe => expect(iframe.contents().find("#text")).to.exist)
      .then(iframe => cy.wrap(iframe.contents().find("#text")))
      .should("have.text", '"Bar"');
  });
});
