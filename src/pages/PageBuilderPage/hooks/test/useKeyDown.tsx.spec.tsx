import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useKeyDown } from '../useKeyDown';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { canRedoReduxHistorySelector, canUndoReduxHistorySelector } from 'store/pageBuilder/selectors';
import { configureStore } from 'store';

// types
import { KeyboardKeys } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('store/pageBuilder/selectors', () => ({
  ...jest.requireActual('store/pageBuilder/selectors'),
  canRedoReduxHistorySelector: jest.fn(),
  canUndoReduxHistorySelector: jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useWheelEvent', () => {
  it(`should triger redo`, () => {
    // mock
    const store = configureStore(stateMock);
    (canRedoReduxHistorySelector as jest.Mock).mockImplementation(() => true);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, {
      code: KeyboardKeys.z,
      ctrlKey: true,
      shiftKey: true,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should triger undo`, () => {
    // mock
    const store = configureStore(stateMock);
    (canUndoReduxHistorySelector as jest.Mock).mockImplementation(() => true);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.z, ctrlKey: true });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should triger action set mouse mode on comment state`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.e });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.comment);
  });

  it(`should triger action set mouse mode on default state`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.escape });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.default);
  });

  it(`should triger action set mouse mode on default state`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.q });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.default);
  });

  it(`should triger action set mouse mode on move state`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.w });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.move);
  });

  it(`should triger action set mouse mode on tool belt a`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.f });

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.toolBeltA);
  });
});
