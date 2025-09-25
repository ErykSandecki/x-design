import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvent } from '../useChangeEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useChangeEvent', () => {
  it(`should trigger change height from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeHeight('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change x from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeHeight('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      sizeType: 'height',
      value: 100,
    });
  });

  it(`should trigger change width from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeWidth('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change x from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeWidth('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      sizeType: 'width',
      value: 100,
    });
  });
});
