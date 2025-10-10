// utils
import { extractColors } from '../extractColors';

jest.mock('html2canvas', () => ({
  __esModule: true,
  default: async (): Promise<any> =>
    new Promise((resolve) =>
      resolve({
        getContext: () => ({
          getImageData: (): any => ({
            data: Array.from(Array(49 * 4), () => 0),
          }),
        }),
      }),
    ),
}));

describe('extractColors', () => {
  it('should extract colors', async () => {
    // before
    const result = await extractColors(0, 0);

    // result
    expect(result).toStrictEqual(Array.from(Array(49), () => ({ a: 0, b: 0, g: 0, r: 0 })));
  });
});
