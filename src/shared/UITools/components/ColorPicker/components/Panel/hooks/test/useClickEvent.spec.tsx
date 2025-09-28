import { MouseEvent, RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useClickEvent } from '../useClickEvent';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

const ref = { current: BASE_2D } as RefObject<T2DCoordinates>;
const mockCallBack = jest.fn();

describe('useClickEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickEvent(ref, mockCallBack));

    // action
    result.current({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
