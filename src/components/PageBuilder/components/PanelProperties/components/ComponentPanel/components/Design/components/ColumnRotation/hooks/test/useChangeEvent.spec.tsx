import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvent } from '../useChangeEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useChangeEvent', () => {
  it(`should trigger change from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, mockCallBack),
    );

    // action
    result.current('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should not change value when mixed and scrubbable input triggered`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(true, false, mockCallBack),
    );

    // action
    result.current('100', true);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should trigger change from ScrubbableInput`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, mockCallBack),
    );

    // action
    result.current('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      id: '1',
      rotate: 100,
    });
  });
});
