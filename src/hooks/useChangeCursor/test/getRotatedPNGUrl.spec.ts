// utils
import { getRotatedPNGUrl } from '../utils';

describe('getRotatedPNGUrl', () => {
  it(`should draw the cursor image rotated onto a canvas and return its data url`, () => {
    // mock
    const translate = vi.fn();
    const rotate = vi.fn();
    const drawImage = vi.fn();

    // spy
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage,
      rotate,
      translate,
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock');

    // before
    const result = getRotatedPNGUrl(90, 'cursor');

    // result
    expect(translate).toHaveBeenCalledWith(16, 16);
    expect(rotate).toHaveBeenCalledWith(Math.PI / 2);
    expect(drawImage).toHaveBeenCalledWith(expect.any(Image), -16, -16, 32, 32);
    expect(result).toBe('url(data:image/png;base64,mock) 16 16, auto');
  });
});
