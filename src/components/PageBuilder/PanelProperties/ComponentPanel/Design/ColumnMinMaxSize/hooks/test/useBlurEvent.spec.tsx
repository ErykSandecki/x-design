import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvent } from '../useBlurEvent';

// mocks
import { sizeMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur height`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(
        { ...sizeMock, value: 100 },
        { ...sizeMock, value: 100 },
        '0',
        'max',
        mockCallBack,
        mockCallBack,
        '0',
      ),
    );

    // action
    result.current.onBlurHeight();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      scoreType: 'max',
      sizeType: 'height',
      value: 0,
    });
  });

  it(`should reset value height`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(
        { ...sizeMock, value: 100 },
        { ...sizeMock, value: 100 },
        '',
        'max',
        mockCallBack,
        mockCallBack,
        '0',
      ),
    );

    // action
    result.current.onBlurHeight();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger blur width`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(
        { ...sizeMock, value: 100 },
        { ...sizeMock, value: 100 },
        '0',
        'max',
        mockCallBack,
        mockCallBack,
        '0',
      ),
    );

    // action
    result.current.onBlurWidth();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      scoreType: 'max',
      sizeType: 'width',
      value: 0,
    });
  });

  it(`should reset value width`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(
        { ...sizeMock, value: 100 },
        { ...sizeMock, value: 100 },
        '0',
        'max',
        mockCallBack,
        mockCallBack,
        '',
      ),
    );

    // action
    result.current.onBlurWidth();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });
});
