import { renderHook } from '@testing-library/react';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = vi.fn();
const stateMock = {
  ...pageBuilderStateMock,
};

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // mock
    window.store = store;

    // before
    const { result } = renderHook(() => useMouseUpEvent(MouseMode.toolBeltA, mockCallBack, mockCallBack), {
      wrapper: getProviderWrapper(store),
    });

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
