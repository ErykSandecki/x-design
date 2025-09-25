import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// types
import { MouseButton, TObject, TRectCoordinates } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

const mockCallBack = jest.fn();
const rectCoordinates = {
  current: {
    [elementAllDataMock.id]: {
      x1: elementAllDataMock.coordinates.x,
      x2: elementAllDataMock.width.value,
      y1: elementAllDataMock.coordinates.y,
      y2: elementAllDataMock.height.value,
    },
  },
} as RefObject<TObject<TRectCoordinates>>;

jest.mock('../../utils/calculateAbsolutePositions', () => ({
  calculateAbsolutePositions: jest.fn(),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event for toolBeltA`, () => {
    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          BASE_3D,
          MouseMode.toolBeltA,
          rectCoordinates,
          mockCallBack,
          mockCallBack,
        ),
      {
        wrapper: ({ children }) => <RefsProvider>{children}</RefsProvider>,
      },
    );

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should trigger event for default`, () => {
    // before
    const { result } = renderHook(
      () =>
        useMouseDownEvent(
          BASE_3D,
          MouseMode.default,
          rectCoordinates,
          mockCallBack,
          mockCallBack,
        ),
      {
        wrapper: ({ children }) => <RefsProvider>{children}</RefsProvider>,
      },
    );

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
