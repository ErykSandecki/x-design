// mocks
import { appInitializerStateMock } from './appInitializerMock';
import { reduxHookFormStateMock } from './reduxHookForm';

export const wholeStateMock = {
  ...appInitializerStateMock,
  ...reduxHookFormStateMock,
};
