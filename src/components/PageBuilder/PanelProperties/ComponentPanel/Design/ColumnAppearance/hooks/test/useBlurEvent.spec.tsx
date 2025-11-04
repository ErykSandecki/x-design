import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvent } from '../useBlurEvent';

// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { MIXED } from 'constant/constants';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur border radius`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent('0', insetsMock, { mode: 'fixed', value: 100 }, false, '1', mockCallBack, mockCallBack),
    );

    // action
    result.current.onBlurBorderRadius();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      borderRadius: {
        b: { mode: 'fixed', value: 0 },
        l: { mode: 'fixed', value: 0 },
        r: { mode: 'fixed', value: 0 },
        t: { mode: 'fixed', value: 0 },
      },
    });
  });

  it(`should reset border radius`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent('', insetsMock, { mode: 'fixed', value: 100 }, false, '1', mockCallBack, mockCallBack),
    );

    // action
    result.current.onBlurBorderRadius();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0');
  });

  it(`should reset border radius when mixed`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent('', insetsMock, { mode: 'fixed', value: 100 }, true, '1', mockCallBack, mockCallBack),
    );

    // action
    result.current.onBlurBorderRadius();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MIXED);
  });

  it(`should trigger blur opacity`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent('0', insetsMock, { mode: 'fixed', value: 100 }, false, '1', mockCallBack, mockCallBack),
    );

    // action
    result.current.onBlurOpacity();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ opacity: { mode: 'fixed', value: 1 } });
  });

  it(`should reset opacity`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent('0', insetsMock, { mode: 'fixed', value: 100 }, false, '', mockCallBack, mockCallBack),
    );

    // action
    result.current.onBlurOpacity();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });
});
