import { MouseEvent } from 'react';
import { noop } from 'lodash';
import { renderHook } from '@testing-library/react';

// hooks
import { useClickEvents } from '../useClickEvents';

const mockCallBack = jest.fn();

describe('useClickEvents', () => {
  it(`should click option`, () => {
    // before
    const { result } = renderHook(() => useClickEvents(mockCallBack, mockCallBack));

    // action
    result.current.onClickOption({
      stopPropagation: noop,
      target: { getAttribute: () => '0', tagName: 'LI' },
    } as unknown as MouseEvent<HTMLElement>);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
    expect(mockCallBack.mock.calls[1][0]).toBe('0');
  });

  it(`should not click option`, () => {
    // before
    const { result } = renderHook(() => useClickEvents(mockCallBack, mockCallBack));

    // action
    result.current.onClickOption({
      stopPropagation: noop,
      target: { getAttribute: () => '0', tagName: 'UL' },
    } as unknown as MouseEvent<HTMLElement>);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should click select`, () => {
    // before
    const { result } = renderHook(() => useClickEvents(mockCallBack, mockCallBack));

    // action
    result.current.onClickSelect({} as MouseEvent);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(true);
  });
});
