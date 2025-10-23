import { renderHook } from '@testing-library/react';

// hooks
import { useBlurGapEvents } from '../useBlurGapEvents';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurGapEvents', () => {
  it(`should trigger blur column gap`, () => {
    // before
    const { result } = renderHook(() => useBlurGapEvents('0', elementMock, '0', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumnGap();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ gap: 'column', value: 0 });
  });

  it(`should reset value column gap`, () => {
    // before
    const { result } = renderHook(() => useBlurGapEvents('', elementMock, '0', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumnGap();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0');
  });

  it(`should trigger blur row gap`, () => {
    // before
    const { result } = renderHook(() => useBlurGapEvents('0', elementMock, '0', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRowGap();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ gap: 'row', value: 0 });
  });

  it(`should reset value row gap`, () => {
    // before
    const { result } = renderHook(() => useBlurGapEvents('0', elementMock, '', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRowGap();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0');
  });
});
