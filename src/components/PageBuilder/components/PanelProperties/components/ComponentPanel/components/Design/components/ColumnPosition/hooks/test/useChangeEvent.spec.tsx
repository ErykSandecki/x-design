import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvent } from '../useChangeEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useChangeEvent', () => {
  it(`should trigger change x from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeX('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change x from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeX('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      coordinates: { x: 100, y: NaN },
      mode: 'dynamic',
      resetAlignment: undefined,
    });
  });

  it(`should trigger change x from scrubbable input when is multiple`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(true, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeX('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: 100, y: NaN },
      mode: 'dynamic',
      resetAlignment: undefined,
    });
  });

  it(`should trigger change y from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeY('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change y from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(false, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeY('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      coordinates: { x: NaN, y: 100 },
      mode: 'dynamic',
      resetAlignment: undefined,
    });
  });

  it(`should trigger change y from scrubbable input when is multiple`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(true, false, false, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeY('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      coordinates: { x: NaN, y: 100 },
      mode: 'dynamic',
      resetAlignment: undefined,
    });
  });
});
