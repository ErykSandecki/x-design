import { RefObject } from 'react';

// utils
import { updateCursor } from '../utils';

const contentRef = {
  current: { style: { cursor: '' } },
} as RefObject<HTMLDivElement>;

describe('updateCursor', () => {
  beforeEach(() => {
    contentRef.current.style.cursor = '';

    // spy
    vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: vi.fn(),
      rotate: vi.fn(),
      translate: vi.fn(),
    } as unknown as CanvasRenderingContext2D);
    vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it(`should update cursor synchronously once the image has already loaded`, () => {
    // mock
    const mockImage = { complete: true, onload: null, src: '' } as unknown as HTMLImageElement;

    // spy
    vi.spyOn(window, 'Image').mockImplementation(function Image() {
      return mockImage;
    });

    // before
    updateCursor(90, contentRef, 'cursor-loaded');

    // result
    expect(contentRef.current.style.cursor).toBe('url(data:image/png;base64,mock) 16 16, auto');
  });

  it(`should update cursor once the image finishes loading`, () => {
    // mock
    const mockImage = { complete: false, onload: null, src: '' } as unknown as HTMLImageElement;

    // spy
    vi.spyOn(window, 'Image').mockImplementation(function Image() {
      return mockImage;
    });

    // before
    updateCursor(90, contentRef, 'cursor-not-loaded-yet');

    // result
    expect(contentRef.current.style.cursor).toBe('');

    // action
    mockImage.onload?.({} as Event);

    // result
    expect(contentRef.current.style.cursor).toBe('url(data:image/png;base64,mock) 16 16, auto');
  });
});
