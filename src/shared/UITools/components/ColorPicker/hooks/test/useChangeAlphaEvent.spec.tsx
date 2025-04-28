import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useChangeAlphaEvent } from '../useChangeAlphaEvent';

const mockCallBack = jest.fn();

describe('useChangeAlphaEvent', () => {
  it(`should trigger on change`, () => {
    // before
    const { result } = renderHook(() => useChangeAlphaEvent(mockCallBack));

    // action
    result.current({
      target: { value: '100' },
    } as ChangeEvent<HTMLInputElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
