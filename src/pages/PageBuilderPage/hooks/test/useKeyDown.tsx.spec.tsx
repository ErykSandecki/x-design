import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useKeyDown } from '../useKeyDown';
import { KeyboardKeys } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

const mockCallBack = jest.fn();

describe('useWheelEvent', () => {
  it(`should triger action set mouse mode on comment state`, () => {
    // before
    renderHook(() => useKeyDown(mockCallBack));

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.e });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.comment);
  });

  it(`should triger action set mouse mode on default state`, () => {
    // before
    renderHook(() => useKeyDown(mockCallBack));

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.escape });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.default);
  });

  it(`should triger action set mouse mode on default state`, () => {
    // before
    renderHook(() => useKeyDown(mockCallBack));

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.q });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.default);
  });

  it(`should triger action set mouse mode on move state`, () => {
    // before
    renderHook(() => useKeyDown(mockCallBack));

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.w });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.move);
  });
});
