// utils
import { extractColors } from '../extractColors';

jest.mock('html2canvas', () => ({
  __esModule: true,
  default: async () =>
    new Promise((resolve) =>
      resolve({
        getContext: () => ({
          getImageData: () => ({
            data: Array.from(Array(49 * 4), () => 0),
          }),
        }),
      }),
    ),
}));

describe('extractColors', () => {
  it('should extract colors', async () => {
    // before
    const result = await extractColors({
      clientX: 0,
      clientY: 0,
    } as MouseEvent);

    // result
    expect(result).toStrictEqual(
      Array.from(Array(49), () => ({ a: 0, b: 0, g: 0, r: 0 })),
    );
  });
});
