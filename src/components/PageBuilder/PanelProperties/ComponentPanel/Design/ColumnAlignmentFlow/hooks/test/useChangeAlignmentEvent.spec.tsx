import { renderHook } from '@testing-library/react';

// hooks
import { useChangeAlignmentEvent } from '../useChangeAlignmentEvent';

// types
import { AlignmentFlow } from 'types';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeAlignmentEvent', () => {
  it(`should trigger change event`, () => {
    // before
    const { result } = renderHook(() => useChangeAlignmentEvent(mockCallBack));

    // action
    result.current(AlignmentFlow.center);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(AlignmentFlow.center);
    expect(mockCallBack.mock.calls[1][0].payload).toBe(AlignmentFlow.center);
  });
});
