import { fireEvent, renderHook } from '@testing-library/react';

// hooks
import { useKeyboardHandler } from './useKeyboardHandler';

// mocks
// import { drawerStateMock, modalStateMock } from '../../tests';

// others
// import { REDUCER_KEY as DRAWER } from '../../store/drawer/actionsType';
// import { REDUCER_KEY as MODAL } from '../../store/modal/actionsType';

// store
import { configureStore } from '../../store/store';

// types
import { KeyboardKeys } from '../../types/enums';
import { TKeyMap } from './types';

// utils
import { getProviderWrapper } from 'test/testHelpers';
import { noop } from 'lodash';

const mockCallBack = jest.fn();

const keyMap: TKeyMap = { action: mockCallBack, secondaryKey: KeyboardKeys.C };

const stateMock = {
  // [DRAWER]: {
  //   ...drawerStateMock,
  // },
  // [MODAL]: {
  //   ...modalStateMock[MODAL],
  // },
};

describe('useKeyboardHandler', () => {
  it('should trigger action', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyboardHandler(true, [], [keyMap]), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should trigger action when any key', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () => useKeyboardHandler(true, [], [{ ...keyMap, anyKey: true }]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.A });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should trigger actionw with passed id', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(() => useKeyboardHandler(true, [], [keyMap], id), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(document.getElementById(id), { key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger actionw when is secondary key', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(() => useKeyboardHandler(true, [], [keyMap], id), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.keyDown(document.getElementById(id), {
      key: KeyboardKeys.control,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should not trigger actionw with alt key', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(
      () =>
        useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['alt'] }], id),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(document.getElementById(id), {
      altKey: true,
      key: KeyboardKeys.c,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger actionw with shift key', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(
      () =>
        useKeyboardHandler(
          true,
          [],
          [{ ...keyMap, primaryKeys: ['shift'] }],
          id,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(document.getElementById(id), {
      key: KeyboardKeys.c,
      shiftKey: true,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger actionw with meta key', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(
      () =>
        useKeyboardHandler(
          true,
          [],
          [{ ...keyMap, primaryKeys: ['meta'] }],
          id,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(document.getElementById(id), {
      key: KeyboardKeys.c,
      metaKey: true,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should trigger block browser events', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(
      () =>
        useKeyboardHandler(true, [], [{ ...keyMap, action: noop }], id, true),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(document.getElementById(id), {
      ctrlKey: true,
      key: KeyboardKeys.F,
      preventDefault: mockCallBack,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should trigger block browser events', () => {
    // mock
    const id = 'id';
    const element = document.createElement('div');
    const store = configureStore(stateMock);

    // before
    element.setAttribute('id', id);
    document.body.appendChild(element);

    renderHook(
      () =>
        useKeyboardHandler(true, [], [{ ...keyMap, action: noop }], id, true),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(document.getElementById(id), {
      key: KeyboardKeys.F,
      metaKey: true,
      preventDefault: mockCallBack,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should trigger action when requires primary key', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['control'] }]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(window, { ctrlKey: true, key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger action when is too much keys', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () =>
        useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['control'] }]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(window, {
      ctrlKey: true,
      key: KeyboardKeys.C,
      shiftKey: true,
    });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it('should trigger action when conditions are meet', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () => useKeyboardHandler(true, [], [{ ...keyMap, conditions: [true] }]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not trigger action when conditions are not meet', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () => useKeyboardHandler(true, [], [{ ...keyMap, conditions: [false] }]),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.keyDown(window, { key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  // it('should not trigger action when drawer is opened', () => {
  //   // mock
  //   const store = configureStore({
  //     ...stateMock,
  //     [DRAWER]: {
  //       ...drawerStateMock,
  //       drawerId: 'drawerId',
  //     },
  //   });

  //   // before
  //   renderHook(
  //     () =>
  //       useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['control'] }]),
  //     {
  //       wrapper: getProviderWrapper(store),
  //     },
  //   );

  //   // action
  //   fireEvent.keyDown(window, { ctrlKey: true, key: KeyboardKeys.C });

  //   // result
  //   expect(mockCallBack.mock.calls.length).toBe(0);
  // });

  // it('should not trigger action when modal is opened', () => {
  //   // mock
  //   const store = configureStore({
  //     ...stateMock,
  //     [MODAL]: {
  //       ...modalStateMock,
  //       modalId: 'modalId',
  //     },
  //   });

  //   // before
  //   renderHook(
  //     () =>
  //       useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['control'] }]),
  //     {
  //       wrapper: getProviderWrapper(store),
  //     },
  //   );

  //   // action
  //   fireEvent.keyDown(window, { ctrlKey: true, key: KeyboardKeys.C });

  //   // result
  //   expect(mockCallBack.mock.calls.length).toBe(0);
  // });

  // it('should not trigger action when drawer and modal is opened', () => {
  //   // mock
  //   const store = configureStore({
  //     ...stateMock,
  //     [DRAWER]: {
  //       ...drawerStateMock,
  //       drawerId: 'drawerId',
  //     },
  //     [MODAL]: {
  //       ...modalStateMock,
  //       modalId: 'modalId',
  //     },
  //   });

  //   // before
  //   renderHook(
  //     () =>
  //       useKeyboardHandler(true, [], [{ ...keyMap, primaryKeys: ['control'] }]),
  //     {
  //       wrapper: getProviderWrapper(store),
  //     },
  //   );

  //   // action
  //   fireEvent.keyDown(window, { ctrlKey: true, key: KeyboardKeys.C });

  //   // result
  //   expect(mockCallBack.mock.calls.length).toBe(0);
  // });

  it('should stop propagation', () => {
    // mock
    const id = 'id';
    const store = configureStore(stateMock);

    // before
    renderHook(() => useKeyboardHandler(true, [], [], id, false, true), {
      wrapper: (children) => (
        <div onKeyDown={mockCallBack}>
          <div id={id}>{getProviderWrapper(store)(children)}</div>
        </div>
      ),
    });

    // action
    fireEvent.keyDown(document.getElementById(id), { key: KeyboardKeys.C });

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
