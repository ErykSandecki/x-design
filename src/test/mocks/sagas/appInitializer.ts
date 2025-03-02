jest.mock('store/appInitializer/saga', () =>
  jest.requireActual('test/mockAll').mockAll('../store/appInitializer/saga'),
);

export {};
