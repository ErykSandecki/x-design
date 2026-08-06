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
    jest.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
      drawImage: jest.fn(),
      rotate: jest.fn(),
      translate: jest.fn(),
    } as unknown as CanvasRenderingContext2D);
    jest.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,mock');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it(`should update cursor synchronously once the image has already loaded`, () => {
    // mock
    const mockImage = { complete: true, onload: null, src: '' } as unknown as HTMLImageElement;

    // spy
    jest.spyOn(window, 'Image').mockImplementation(() => mockImage);

    // before
    updateCursor(90, contentRef, 'cursor-loaded');

    // result
    expect(contentRef.current.style.cursor).toBe('url(data:image/png;base64,mock) 16 16, auto');
  });

  it(`should update cursor once the image finishes loading`, () => {
    // mock
    const mockImage = { complete: false, onload: null, src: '' } as unknown as HTMLImageElement;

    // spy
    jest.spyOn(window, 'Image').mockImplementation(() => mockImage);

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
