// types
import { TMainState } from 'types';

Cypress.Commands.add('getState', (reducerKey: keyof TMainState, path: any) =>
  cy
    .window()
    .its('store')
    .invoke('getState')
    .then((state: TMainState) => path.split('.').reduce((acc: any, key: any) => acc[key], state[reducerKey])),
);
