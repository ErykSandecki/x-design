// types
import { E2EAttribute } from 'types';

// utils
import { getE2EAttribute } from '../../utils/getE2EAttribute';

Cypress.Commands.add('box', (e2eValue: string) => {
  const chains = e2eValue.split('.');
  let chain = cy.get(getE2EAttribute(E2EAttribute.box, chains[0]));

  for (let i = 1; i < chains.length; i++) {
    chain = chain.get(getE2EAttribute(E2EAttribute.box, chains[i]));
  }

  return chain;
});
