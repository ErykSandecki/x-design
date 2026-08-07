vi.mock('store/appInitializer/saga', async (importOriginal) => {
  const { mockAll } = await vi.importActual<typeof import('test/mockAll')>('test/mockAll');

  return mockAll(importOriginal);
});

export {};
