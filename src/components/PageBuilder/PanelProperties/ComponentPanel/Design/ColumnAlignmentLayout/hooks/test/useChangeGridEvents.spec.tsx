import { renderHook } from '@testing-library/react';

// hooks
import { useChangeGridEvents } from '../useChangeGridEvents';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeGridEvents', () => {
  it(`should trigger change event from text field {columns}`, () => {
    // before
    const { result } = renderHook(() => useChangeGridEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeColumns('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1]).toBe(undefined);
  });

  it(`should trigger change event from text field {rows}`, () => {
    // before
    const { result } = renderHook(() => useChangeGridEvents(mockCallBack, mockCallBack));

    // action
    result.current.onChangeRows('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1]).toBe(undefined);
  });
});
