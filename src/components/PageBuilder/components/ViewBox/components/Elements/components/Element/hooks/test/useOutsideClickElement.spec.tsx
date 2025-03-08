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
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    selectedElements: {
      [selectedElementMock.id]: selectedElementMock,
    },
  },
};

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('useOutsideClickElement', () => {
  it('should not trigger event when shift key', () => {
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
    fireEvent.mouseDown(window, { buttons: MouseButton.lmb, shiftKey: true });

    // result
    expect(store.getState()[PAGE_BUILDER].selectedElements).toStrictEqual({
      [selectedElementMock.id]: selectedElementMock,
    });
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
