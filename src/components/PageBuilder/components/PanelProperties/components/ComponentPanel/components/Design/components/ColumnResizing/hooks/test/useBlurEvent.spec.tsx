import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvent } from '../useBlurEvent';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur height`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, '0', mockCallBack, mockCallBack, '0'),
    );

    // action
    result.current.onBlurHeight();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      sizeType: 'height',
      value: 0,
    });
  });

  it(`should trigger blur height`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, 'auto', mockCallBack, mockCallBack, '0'),
    );

    // action
    result.current.onBlurHeight();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      sizeType: 'height',
      value: 'auto',
    });
  });

  it(`should reset value height`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, '', mockCallBack, mockCallBack, '0'),
    );

    // action
    result.current.onBlurHeight();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger blur width`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, '0', mockCallBack, mockCallBack, '0'),
    );

    // action
    result.current.onBlurWidth();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      sizeType: 'width',
      value: 0,
    });
  });

  it(`should trigger blur width`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, '0', mockCallBack, mockCallBack, 'auto'),
    );

    // action
    result.current.onBlurWidth();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      sizeType: 'width',
      value: 'auto',
    });
  });

  it(`should reset value width`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, '0', mockCallBack, mockCallBack, ''),
    );

    // action
    result.current.onBlurWidth();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });
});
