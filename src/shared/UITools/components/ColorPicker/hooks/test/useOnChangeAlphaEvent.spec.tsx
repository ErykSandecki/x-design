import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useOnChangeAlphaEvent } from '../useOnChangeAlphaEvent';

const mockCallBack = jest.fn();

describe('useOnChangeAlphaEvent', () => {
  it(`should trigger on change`, () => {
    // before
    const { result } = renderHook(() => useOnChangeAlphaEvent(mockCallBack));

    // action
    result.current({
      target: { value: '100' },
    } as ChangeEvent<HTMLInputElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
