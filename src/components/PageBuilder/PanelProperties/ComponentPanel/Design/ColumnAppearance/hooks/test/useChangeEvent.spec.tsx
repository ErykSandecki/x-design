import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvent } from '../useChangeEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeEvent', () => {
  it(`should trigger change opacity from text field`, () => {
    // before
    const { result } = renderHook(() => useChangeEvent({ type: 'fixed', value: 100 }, mockCallBack));

    // action
    result.current.onChangeOpacity('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change x from scrubbable input`, () => {
    // before
    const { result } = renderHook(() => useChangeEvent({ type: 'fixed', value: 100 }, mockCallBack));

    // action
    result.current.onChangeOpacity('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ opacity: { type: 'fixed', value: 100 } });
  });
});
