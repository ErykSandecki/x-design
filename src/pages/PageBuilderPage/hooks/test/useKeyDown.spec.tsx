import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useKeyDown } from '../useKeyDown';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { canRedoReduxHistorySelector, canUndoReduxHistorySelector } from 'store/pageBuilder/selectors';
import { configureStore, store } from 'store';

// types
import { KeyboardKeys } from 'types';
import { MouseMode } from 'types/enums/mouseMode';
import type { Mock } from 'vitest';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = vi.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

vi.mock('store/pageBuilder/selectors', async (importOriginal) => ({
  ...(await importOriginal()),
  canRedoReduxHistorySelector: vi.fn(),
  canUndoReduxHistorySelector: vi.fn(),
}));

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: (): any => mockCallBack,
}));

describe('useWheelEvent', () => {
  beforeAll(() => {
    // mock
    window.store = store;
  });

  it(`should triger redo`, () => {
    // mock
    const store = configureStore(stateMock);
    (canRedoReduxHistorySelector as Mock).mockImplementation(() => true);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, {
      code: KeyboardKeys.z,
      metaKey: true,
      shiftKey: true,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should triger undo`, () => {
    // mock
    const store = configureStore(stateMock);
    (canUndoReduxHistorySelector as Mock).mockImplementation(() => true);

    // before
    renderHook(() => useKeyDown(mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { code: KeyboardKeys.z, metaKey: true });

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
