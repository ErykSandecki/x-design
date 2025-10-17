// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('UIColorPicker', (e2eValue: string, color: string, colorAlpha?: string) =>
  cy
    .get(getE2EAttribute(E2EAttribute.fieldGroup, e2eValue))
    .get(getE2EAttribute(E2EAttribute.textField, 'color'))
    .get(getE2EAttribute(E2EAttribute.color, e2eValue))
    .click()
    .wait(500)
    .then(() => {
      cy.input('input.ant-input', `${color}{enter}`);
      cy.input('input.ant-input-number-input', `${colorAlpha || 100}{enter}`);
    }),
);
