import { fireEvent, renderHook } from '@testing-library/react';
import { RefObject } from 'react';

// hooks
import { useClickableAreaEvents } from '../useClickableAreaEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';
import { unselectElements } from 'store/pageBuilder/reducer';

// utils
import { createHtmlElement } from 'utils';
import { getProviderWrapper } from 'test';

const areaRef = {
  current: createHtmlElement('div'),
} as RefObject<HTMLElement>;
const mockCallBack = vi.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
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
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ payload: undefined, type: unselectElements.type });
  });
});
