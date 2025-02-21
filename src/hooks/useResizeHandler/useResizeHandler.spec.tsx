import { act, fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useResizeHandler } from './useResizeHandler';

// types
import { MouseButton } from '../../types/enums';

const maxHeight = 1000;
const maxWidth = 1000;
const minHeight = 250;
const minWidth = 250;

describe('useResizeHandler', () => {
  beforeEach(() => {
    window.innerHeight = 1000;
    window.innerWidth = 1000;
  });

  it('should resize width', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(0, 250, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownX({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.width).toBe(500);
  });

  it('should resize width inverted', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(0, 250, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownX({ buttons: MouseButton.lmb } as any, true);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.width).toBe(500);
  });

  it('should set min width when below min', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(0, 500, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownX({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 0 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.width).toBe(250);
  });

  it('should set max width when over max', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(0, 500, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownX({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 1500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.width).toBe(1000);
  });

  it('should not resize width when mouse button is wrong', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(0, 250, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownX({ buttons: MouseButton.mmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.width).toBe(250);
  });

  it('should resize height', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(250, 0, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownY({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientY: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.height).toBe(500);
  });

  it('should resize height inverted', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(250, 0, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownY({ buttons: MouseButton.lmb } as any, true);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientY: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.height).toBe(500);
  });

  it('should set min height when below min', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(500, 0, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownY({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientY: 0 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.height).toBe(250);
  });

  it('should set max height when over max', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(500, 0, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownY({ buttons: MouseButton.lmb } as any, false);
    });

    act(() => {
      fireEvent.mouseMove(document, { clientY: 1500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.height).toBe(1000);
  });

  it('should not resize width when mouse button is wrong', () => {
    // mock
    const ref = {
      current: {
        getBoundingClientRect: () => ({ bottom: 0, left: 0, right: 0, top: 0 }),
      },
    } as any;

    // before
    const { result } = renderHook(() =>
      useResizeHandler(250, 0, maxHeight, maxWidth, minHeight, minWidth, ref),
    );

    // action
    act(() => {
      result.current.onMouseDownY(
        { buttons: MouseButton.mmb, clientY: 250 } as any,
        false,
      );
    });

    act(() => {
      fireEvent.mouseMove(document, { clientY: 500 });
      fireEvent.mouseUp(document);
    });

    // result
    expect(result.current.height).toBe(250);
  });
});
