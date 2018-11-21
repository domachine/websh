describe("IframeDriver", () => {
  const websh = () =>
    cy
      .window()
      .then(win =>
        win.Websh(win.IframeDriver(win.document.querySelector("iframe")))
      );

  beforeEach(() => {
    cy.visit("http://localhost:5000/fixtures/testbed", {
      onLoad(win) {
        const iframe = win.document.createElement("iframe");
        win.document.body.appendChild(iframe);
      }
    });
  });

  it("Executes a sample script", () => {
    const script = "echo?text=Foo | sed?regex=Foo&replace=Bar | cat";

    websh()
      .then(executeScript => executeScript(script))
      .then(result => expect(result).to.deep.equal([["Bar"]]));

    cy.get("iframe").should("have.lengthOf", 1);
  });
});
