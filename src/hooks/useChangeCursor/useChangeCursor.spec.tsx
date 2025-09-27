import { act, RefObject } from 'react';
import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useChangeCursor } from './useChangeCursor';

// utils
import { resetCursor, updateCursor } from './utils';

const mockCallBack = jest.fn();

jest.mock('./utils', () => ({
  resetCursor: jest.fn(),
  updateCursor: jest.fn(),
}));

const contentRef = {
  current: { style: { cursor: '' } },
} as RefObject<HTMLDivElement>;

describe('useMouseDownEvent', () => {
  beforeEach(() => {
    (resetCursor as jest.Mock).mockImplementation(mockCallBack);
    (updateCursor as jest.Mock).mockImplementation(mockCallBack);
  });

  it(`should change state pressing`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseDown();
    });

    // result
    expect(result.current.isPressing).toBe(true);
  });

  it(`should change cursor on mouse enter event`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseEnter(360, 0);
    });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(360);
    expect(mockCallBack.mock.calls[0][1]).toStrictEqual({
      current: { style: { cursor: '' } },
    });
    expect(mockCallBack.mock.calls[0][2]).toBe('cursor');
  });

  it(`should not trigger mouse enter event`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseDown();
    });

    // action
    await act(() => {
      result.current.onMouseEnter(360, 0);
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should change cursor on mouse leave event`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseLeave();
    });

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      current: { style: { cursor: '' } },
    });
    expect(mockCallBack.mock.calls[0][1]).toBe('cursorDefault');
  });

  it(`should not triiger mouse leave event`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseDown();
    });

    // action
    await act(() => {
      result.current.onMouseLeave();
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should revert default cursor`, async () => {
    // before
    const { result } = renderHook(() => useChangeCursor(0, contentRef, 'cursor', 'cursorDefault'));

    // action
    await act(() => {
      result.current.onMouseDown();
    });

    // action
    await act(() => {
      fireEvent.mouseUp(window);
    });

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({
      current: { style: { cursor: '' } },
    });
    expect(mockCallBack.mock.calls[0][1]).toBe('cursorDefault');
    expect(result.current.isPressing).toBe(false);
  });

  it(`should trigger update cursor after change angle`, async () => {
    // before
    const { rerender, result } = renderHook((props: any) => {
      const angle = props?.currentAngle || 0;
      return useChangeCursor(angle, contentRef, 'cursor', 'cursorDefault');
    });

    // action
    await act(() => {
      result.current.onMouseDown();
    });

    // action
    rerender({ currentAngle: 180 });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(180);
    expect(mockCallBack.mock.calls[0][1]).toStrictEqual({
      current: { style: { cursor: '' } },
    });
    expect(mockCallBack.mock.calls[0][2]).toBe('cursor');
  });
});
