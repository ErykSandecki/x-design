import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// mocks
import { elementMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_3D } from 'shared/ZoomBox/constants';

// store
import { configureStore } from 'store';

// types
import { MouseButton, TObject } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const mockCallBack = jest.fn();
const rectCoordinates = {
  current: {
    [elementMock.id]: {
      x1: elementMock.coordinates.x,
      x2: elementMock.width.value,
      y1: elementMock.coordinates.y,
      y2: elementMock.height.value,
    },
  },
} as RefObject<TObject<TRectCoordinates>>;
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('../../utils/calculateAbsolutePositions', () => ({
  calculateAbsolutePositions: jest.fn(),
}));

describe('useMouseMoveEvent', () => {
  it(`should trigger event for default`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMouseDownEvent(BASE_3D, MouseMode.default, rectCoordinates, mockCallBack), {
      wrapper: (children) => <RefsProvider>{getProviderWrapper(store)(children)}</RefsProvider>,
    });

    // action
    result.current({ buttons: MouseButton.lmb } as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
