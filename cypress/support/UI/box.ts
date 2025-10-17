// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('box', (e2eValue: string) => {
  const parts = e2eValue.split('.');
  let chain = cy.get(getE2EAttribute(E2EAttribute.box, parts[0]));

  for (let i = 1; i < parts.length; i++) {
    chain = chain.get(getE2EAttribute(E2EAttribute.box, parts[i]));
  }

  return chain;
});
