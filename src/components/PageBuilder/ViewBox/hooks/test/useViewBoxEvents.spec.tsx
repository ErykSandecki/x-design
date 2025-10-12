import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useViewBoxEvents } from '../useViewBoxEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'types/enums/mouseMode';

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

describe('useViewBoxEvents', () => {
  it(`should return view box events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useViewBoxEvents(BASE_3D, MouseMode.default, mockCallBack), {
      wrapper: (children) => <RefsProvider>{getProviderWrapper(store)(children)}</RefsProvider>,
    });

    // result
    expect(result.current).toStrictEqual({
      onKeyDown: expect.any(Function),
      onKeyUp: expect.any(Function),
      onMouseDown: expect.any(Function),
      onMouseMove: expect.any(Function),
      onMouseUp: expect.any(Function),
      selectableArea: null,
    });
  });
});
