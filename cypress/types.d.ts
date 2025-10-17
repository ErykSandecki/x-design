/// <reference types="cypress" />

// types
import { TMainState } from '../src/types/reducers';

declare global {
  namespace Cypress {
    interface Chainable {
      button(e2eValue: string): Chainable<JQuery<HTMLElement>>;
      getState<K extends keyof TMainState>(reducerKey: K): Chainable<TMainState[K]>;
      UITab(e2eValue: string, value: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};
