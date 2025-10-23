import { renderHook } from '@testing-library/react';

// hooks
import { useChangeGapEvents } from '../useChangeGapEvents';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeGapEvents', () => {
  it(`should trigger change event from text field {column}`, () => {
    // before
    const { result } = renderHook(() => useChangeGapEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeColumnGap('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1]).toBe(undefined);
  });

  it(`should trigger change event from scrubbable input {column}`, () => {
    // before
    const { result } = renderHook(() => useChangeGapEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeColumnGap('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ gap: 'column', value: 100 });
  });

  it(`should trigger change event from text field {row}`, () => {
    // before
    const { result } = renderHook(() => useChangeGapEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeRowGap('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1]).toBe(undefined);
  });

  it(`should trigger change event from scrubbable input {row}`, () => {
    // before
    const { result } = renderHook(() => useChangeGapEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeRowGap('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ gap: 'row', value: 100 });
  });
});
