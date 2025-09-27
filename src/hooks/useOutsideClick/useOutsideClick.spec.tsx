import { act, fireEvent, renderHook, waitFor } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useOutsideClick } from './useOutsideClick';

// types
import { KeyboardKeys } from '../../types/enums';

const mockCallBack = jest.fn();

describe('useOutsideClick', () => {
  const ref = { current: { contains: () => false } } as RefObject<any>;

  it('should not be selected', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref));

    // result
    expect(result.current.selected).toEqual(false);
  });

  it('should be selected', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    // result
    expect(result.current.selected).toEqual(true);
  });

  it('should trigger outside if element is diffrent than target', async () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    act(() => {
      fireEvent.mouseDown(document, { button: 0 });
    });

    // result
    await waitFor(() => expect(result.current.selected).toEqual(false));
  });

  it('should trigger outside with callback', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref, mockCallBack));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    act(() => {
      fireEvent.mouseDown(document, { button: 0 });
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger outside with callback', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref, mockCallBack));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    act(() => {
      fireEvent.mouseDown(document, { button: 1 });
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should trigger outside on element passed by id', async () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref, mockCallBack, 'id'));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    act(() => {
      fireEvent.mouseDown(document, { button: 0 });
    });

    // result
    await waitFor(() => expect(result.current.selected).toEqual(true));
  });

  it('should be unselected after keydown escape', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref, undefined, '', false, false));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    fireEvent.keyDown(window, { key: KeyboardKeys.escape });

    // result
    expect(result.current.selected).toEqual(false);
  });

  it('should not be unselected after keydown escape which is locked', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    fireEvent.keyDown(window, { key: KeyboardKeys.escape });

    // result
    expect(result.current.selected).toEqual(true);
  });

  it('should not be unselected after keydown wrong key', () => {
    // before
    const { result } = renderHook(() => useOutsideClick([], ref, undefined, '', false, false));

    // action
    act(() => {
      result.current.setSelected(true);
    });

    fireEvent.keyDown(window, { key: KeyboardKeys.enter });

    // result
    expect(result.current.selected).toEqual(true);
  });
});
