import { renderHook } from '@testing-library/react';

// hooks
import { useClickHorizontalAlignmentEvent } from '../useClickHorizontalAlignmentEvent';

// types
import { AlignmentHorizontal } from 'types';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useClickHorizontalAlignmentEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickHorizontalAlignmentEvent());

    // action
    result.current(AlignmentHorizontal.center);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
