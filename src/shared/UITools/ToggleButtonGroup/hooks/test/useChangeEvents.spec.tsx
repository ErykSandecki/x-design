import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvents } from '../useChangeEvents';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeEvents', () => {
  it(`should trigger events once`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(false, false, null, mockCallBack, ''));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should select value for single`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(false, false, mockCallBack, mockCallBack, ''));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('value');
  });

  it(`should unselect value for single`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(false, false, mockCallBack, mockCallBack, 'value'));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('');
  });

  it(`should select value for multiple`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(false, true, mockCallBack, mockCallBack, []));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual(['value']);
  });

  it(`should unselect value for multiple`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(false, true, mockCallBack, mockCallBack, ['value']));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual([]);
  });

  it(`should not unselect value for multiple`, () => {
    // before
    const { result } = renderHook(() => useChangeEvents(true, true, mockCallBack, mockCallBack, ['value']));

    // action
    result.current('value');

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual(['value']);
  });
});
