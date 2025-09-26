import { renderHook } from '@testing-library/react';

// hooks
import { useFocusEvent } from '../useFocusEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useFocusEvent', () => {
  it(`should trigger focus`, () => {
    // before
    const { result } = renderHook(() => useFocusEvent(mockCallBack));

    // action
    result.current('height');

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('height');
  });
});
