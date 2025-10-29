import { renderHook } from '@testing-library/react';

// hooks
import { useClickCellEvent } from '../useClickCellEvent';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurGapEvents', () => {
  it(`should trigger click cell`, () => {
    // before
    const { result } = renderHook(() => useClickCellEvent());

    // action
    result.current({ columns: 12, rows: 8 });

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ columns: 12, rows: 8 });
  });
});
