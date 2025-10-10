import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useChangeColorEvent } from '../useChangeColorEvent';

const mockCallBack = jest.fn();

describe('useChangeColorEvent', () => {
  it(`should trigger on change`, () => {
    // before
    const { result } = renderHook(() => useChangeColorEvent(mockCallBack));

    // action
    result.current({
      target: { value: '100' },
    } as ChangeEvent<HTMLInputElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
