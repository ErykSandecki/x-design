import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useClickableAreaEvents } from '../useClickableAreaEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { UNSELECT_ELEMENTS } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// utils
import { createHtmlElement } from 'utils';
import { getProviderWrapper } from 'test';

const areaRef = {
  current: createHtmlElement('div'),
} as RefObject<HTMLElement>;
const mockCallBack = jest.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useClickableAreaEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useClickableAreaEvents(areaRef), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual({
      onMouseDown: expect.any(Function),
    });
  });

  it(`should unselect elements`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useClickableAreaEvents(areaRef), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseDown(document);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ type: UNSELECT_ELEMENTS });
  });
});
