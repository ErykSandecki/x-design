// types
import { TMainState } from 'types';

Cypress.Commands.add('getState', (reducerKey: keyof TMainState) =>
  cy
    .window()
    .its('store')
    .invoke('getState')
    .then((state: TMainState) => state[reducerKey]),
);
