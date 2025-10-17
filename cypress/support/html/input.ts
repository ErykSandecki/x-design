Cypress.Commands.add('input', (query: string, value: string) => cy.get(query).clear().type(value));
