// types
import { TMainState } from '../../src/types/reducers';

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      box(e2eValue: string): Chainable<JQuery<HTMLElement>>;
      button(e2eValue: string): Chainable<JQuery<HTMLElement>>;
      getState<K extends keyof TMainState>(reducerKey: K): Chainable<TMainState[K]>;
      input(query: string, value: string): Chainable<JQuery<HTMLElement>>;
      UIButtonIcon(e2eValue): Chainable<JQuery<HTMLElement>>;
      UIColorInput(e2eValue: string, color: string, colorAlpha?: string): Chainable<JQuery<HTMLElement>>;
      UIColorPicker(e2eValue: string, color: string, colorAlpha?: string): Chainable<JQuery<HTMLElement>>;
      UISection(e2eValue: string): Chainable<JQuery<HTMLElement>>;
      UITab(e2eValue: string, value: string): Chainable<JQuery<HTMLElement>>;
      UITextField(e2eValue): Chainable<JQuery<HTMLElement>>;
      shouldHaveBackground(expectedHex: string): Chainable<Subject>;
    }
  }
}

export {};
