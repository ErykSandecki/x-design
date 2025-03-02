// mocks
import { appInitializerStateMock } from './appInitializerMock';
import { pageBuilderStateMock } from './pageBuilderMock';
import { reduxHookFormStateMock } from './reduxHookFormMock';

export const wholeStateMock = {
  ...appInitializerStateMock,
  ...pageBuilderStateMock,
  ...reduxHookFormStateMock,
};
