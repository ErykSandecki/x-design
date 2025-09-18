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
  it(`should trigger blur x`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '0', '0'),
    );

    // action
    result.current.onBlurX();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      mode: 'static',
      resetAlignment: undefined,
    });
  });

  it(`should trigger blur x multiple`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '0', '0'),
    );

    // action
    result.current.onBlurX();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      mode: 'static',
      resetAlignment: undefined,
    });
  });

  it(`should reset value x`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '', '0'),
    );

    // action
    result.current.onBlurX();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0');
  });

  it(`should trigger blur y`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '0', '0'),
    );

    // action
    result.current.onBlurY();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      mode: 'static',
      resetAlignment: undefined,
    });
  });

  it(`should trigger blur y multiple`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '0', '0'),
    );

    // action
    result.current.onBlurY();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 0, y: 0 },
      mode: 'static',
      resetAlignment: undefined,
    });
  });

  it(`should reset value y`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvent(elementAllDataMock, mockCallBack, mockCallBack, '0', ''),
    );

    // action
    result.current.onBlurY();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0');
  });
});
