import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useViewBoxEvents } from '../useViewBoxEvents';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useViewBoxEvents', () => {
  it(`should return view box events and data`, () => {
    // before
    const { result } = renderHook(() => useViewBoxEvents(BASE_3D, MouseMode.default, mockCallBack), {
      wrapper: ({ children }) => <RefsProvider>{children}</RefsProvider>,
    });

    // result
    expect(result.current).toStrictEqual({
      elementArea: null,
      onKeyDown: expect.any(Function),
      onKeyUp: expect.any(Function),
      onMouseDown: expect.any(Function),
      onMouseMove: expect.any(Function),
      onMouseUp: expect.any(Function),
      selectableArea: null,
    });
  });
});
