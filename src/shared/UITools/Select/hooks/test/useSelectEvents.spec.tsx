import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useSelectEvents } from '../useSelectEvents';

const mockCallBack = vi.fn();
const optionsRef = { current: { getBoundingClientRect: () => ({ height: 100 }) } } as RefObject<HTMLUListElement>;
const selectRef = { current: { getBoundingClientRect: () => ({ height: 100 }) } } as RefObject<HTMLDivElement>;

describe('useSelectEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() => useSelectEvents('', mockCallBack, mockCallBack, optionsRef, selectRef));

    // result
    expect(result).toStrictEqual({
      current: { onClickOption: expect.any(Function), onClickSelect: expect.any(Function), selected: false },
    });
  });
});
