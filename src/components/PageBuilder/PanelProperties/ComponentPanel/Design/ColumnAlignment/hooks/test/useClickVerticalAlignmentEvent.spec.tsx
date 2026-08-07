import { renderHook } from '@testing-library/react';

// hooks
import { useClickVerticalAlignmentEvent } from '../useClickVerticalAlignmentEvent';

// types
import { AlignmentVertical } from 'types';

const mockCallBack = vi.fn();

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: (): any => mockCallBack,
}));

describe('useClickVerticalAlignmentEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useClickVerticalAlignmentEvent());

    // action
    result.current(AlignmentVertical.center);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
