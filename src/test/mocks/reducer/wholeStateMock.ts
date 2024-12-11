// mocks
import { appInitializerStateMock } from './appInitializerMock';
import { reduxHookFormStateMock } from './reduxHookForm';
import { routerStateMock } from './routerMock';

export const wholeStateMock = {
  ...appInitializerStateMock,
  ...reduxHookFormStateMock,
  ...routerStateMock,
};
