import { renderHook } from '@testing-library/react';

// hooks
import { useChangeGridEvents } from '../useChangeGridEvents';

const mockCallBack = vi.fn();

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
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
