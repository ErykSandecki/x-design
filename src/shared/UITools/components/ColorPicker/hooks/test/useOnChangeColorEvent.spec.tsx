import { ChangeEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useOnChangeColorEvent } from '../useOnChangeColorEvent';

const mockCallBack = jest.fn();

describe('useOnChangeColorEvent', () => {
  it(`should trigger on change`, () => {
    // before
    const { result } = renderHook(() => useOnChangeColorEvent(mockCallBack));

    // action
    result.current({
      target: { value: '100' },
    } as ChangeEvent<HTMLInputElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
