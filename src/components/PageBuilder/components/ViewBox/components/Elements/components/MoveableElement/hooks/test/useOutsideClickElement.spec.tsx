import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useOutsideClickElement } from '../useOutsideClickElement';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { MouseButton } from 'types';

// utils
import { getProviderWrapper } from 'test/testHelpers';

const ref = { current: { contains: () => false } } as RefObject<any>;
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('useOutsideClickElement', () => {
  it('should not be selected', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useOutsideClickElement(ref, '-1', false),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current.selected).toEqual(false);
  });

  it('should be selected', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useOutsideClickElement(ref, selectedElementMock.id, true),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current.selected).toEqual(true);
  });

  it('should not be selected if on the store is not selected', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useOutsideClickElement(ref, selectedElementMock.id, false),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    result.current.setSelected(true);

    // result
    expect(result.current.selected).toEqual(false);
  });

  it('should not be selected if click outside', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(
      () => useOutsideClickElement(ref, selectedElementMock.id, true),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // action
    fireEvent.mouseDown(window, { buttons: MouseButton.lmb, shiftKey: false });

    // result
    expect(store.getState()[PAGE_BUILDER].selectedElements).toStrictEqual({});
  });
});
