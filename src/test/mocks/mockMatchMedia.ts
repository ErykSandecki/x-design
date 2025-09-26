export const mockMatchMedia = (matches: boolean): void => {
  global.window = Object.create(window);

  Object.defineProperty(window, 'matchMedia', {
    value: jest.fn().mockImplementation(() => ({
      matches,
    })),
    writable: true,
  });
};
