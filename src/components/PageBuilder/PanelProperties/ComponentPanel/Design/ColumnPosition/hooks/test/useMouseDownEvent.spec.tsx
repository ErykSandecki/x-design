import { renderHook } from '@testing-library/react';

// hooks
import { useMouseDownEvent } from '../useMouseDownEvent';

// others
import { CLEAR_PREV_STATE } from 'store/pageBuilder/actionsType';

const mockCallBack = vi.fn();

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: (): any => mockCallBack,
}));

describe('useMouseDownEvent', () => {
  it(`should trigger mouse down event`, () => {
    // before
    const { result } = renderHook(() => useMouseDownEvent());

    // action
    result.current();

    // result
    expect(mockCallBack.mock.calls[0][0].type).toBe(CLEAR_PREV_STATE);
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      isMultipleMoving: true,
    });
  });
});
