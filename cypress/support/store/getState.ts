// types
import { TMainState } from '../../../src/types/reducers';

Cypress.Commands.add('getState', (reducerKey: keyof TMainState, path: any) =>
  cy
    .window()
    .its('store')
    .invoke('getState')
    .then((state: TMainState) => path.split('.').reduce((acc, key) => acc[key], state[reducerKey])),
);
