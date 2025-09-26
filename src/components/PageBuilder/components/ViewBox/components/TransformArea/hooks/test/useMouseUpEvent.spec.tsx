import { fireEvent, renderHook } from '@testing-library/react';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// hooks
import { useMouseUpEvent } from '../useMouseUpEvent';

// store
import { configureStore } from 'store';

// types
import { AnchorResize, AnchorRotate } from 'store/pageBuilder/enums';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();

const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseUpEvent', () => {
  it(`should trigger event`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    renderHook(() => useMouseUpEvent(), {
      wrapper: getProviderWrapper(store),
    });

    // action
    fireEvent.mouseUp(window, {});

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      isResizing: false,
      isRotating: false,
      selectedAnchorResize: AnchorResize.none,
      selectedAnchorRotate: AnchorRotate.none,
    });
  });
});
