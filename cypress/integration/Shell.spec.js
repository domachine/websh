describe("Shell", () => {
  it("Executes sample script", () => {
    const text = "Sample output";
    cy.visit("http://localhost:5000/shell");

    cy.get('input[name="prompt"]').type(
      `/fixtures/echo?text=${text} | /fixtures/cat{enter}`
    );

    cy.get("iframe")
      .should("have.attr", "src", "/fixtures/cat")
      .should(iframe =>
        expect(iframe.contents().find("#text")).to.have.text(
          JSON.stringify(text)
        )
      );
  });
});
