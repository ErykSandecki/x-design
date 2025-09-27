import { noop } from 'lodash';
import { renderHook } from '@testing-library/react';

// hooks
import { useToggleButtonGroupEvents } from '../useToggleButtonGroupEvents';

describe('useToggleButtonGroupEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() => useToggleButtonGroupEvents(false, '', false, noop));

    // result
    expect(result.current).toStrictEqual({
      onChange: expect.any(Function),
      value: '',
    });
  });
});
