// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('UITab', (e2eValue: string, value: string) =>
  cy.get(getE2EAttribute(E2EAttribute.tabs, e2eValue)).get(getE2EAttribute(E2EAttribute.tab, value)),
);
