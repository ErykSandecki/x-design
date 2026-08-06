// utils
import { getRotatedPNGUrl } from '../utils';

describe('getRotatedPNGUrl', () => {
  it(`should draw the cursor image rotated onto a canvas and return its data url`, () => {
    // mock
    const translate = jest.fn();
    const rotate = jest.fn();
    const drawImage = jest.fn();

    // spy
    jest
      .spyOn(HTMLCanvasElement.prototype, 'getContext')
      .mockReturnValue({ drawImage, rotate, translate } as unknown as CanvasRenderingContext2D);
    jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock');

    // before
    const result = getRotatedPNGUrl(90, 'cursor');

    // result
    expect(translate).toHaveBeenCalledWith(16, 16);
    expect(rotate).toHaveBeenCalledWith(Math.PI / 2);
    expect(drawImage).toHaveBeenCalledWith(expect.any(Image), -16, -16, 32, 32);
    expect(result).toBe('url(data:image/png;base64,mock) 16 16, auto');
  });
});
