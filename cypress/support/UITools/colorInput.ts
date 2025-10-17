// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('UIColorInput', (e2eValue: string, color: string, colorAlpha?: string) =>
  cy.get(getE2EAttribute(E2EAttribute.fieldGroup, e2eValue)).then(() => {
    cy.UITextField('color').clear().type(`${color}{enter}`);
    cy.UITextField('alpha')
      .clear()
      .type(`${colorAlpha || 100}{enter}`);
  }),
);
