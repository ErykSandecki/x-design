import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useKeyDown } from '../useKeyDown';

// types
import { KeyboardKeys } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

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

  it(`should triger action set mouse mode on tool belt a`, () => {
    // before
    renderHook(() => useKeyDown(mockCallBack));

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.f });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.toolBeltA);
  });
});
