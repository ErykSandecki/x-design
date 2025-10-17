// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('UISection', (e2eValue: string) => cy.get(getE2EAttribute(E2EAttribute.section, e2eValue)));
