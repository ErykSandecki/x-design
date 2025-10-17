Cypress.Commands.add('shouldHaveBackground', { prevSubject: true }, (subject, expectedHex) => {
  const rgbToHex = (rgb): any => {
    const result = /^rgba?\((\d+),\s*(\d+),\s*(\d+)/i.exec(rgb);
    const r = parseInt(result[1], 10);
    const g = parseInt(result[2], 10);
    const b = parseInt(result[3], 10);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  };

  cy.wrap(subject).should(($el) => {
    const bg = $el.css('background-color');
    const hex = rgbToHex(bg);
    expect(hex).to.eq(expectedHex.toUpperCase());
  });
});
