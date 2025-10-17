// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('UITextField', (e2eValue: string) =>
  cy.get(getE2EAttribute(E2EAttribute.textField, e2eValue)).get(getE2EAttribute(E2EAttribute.textFieldInput, e2eValue)),
);
