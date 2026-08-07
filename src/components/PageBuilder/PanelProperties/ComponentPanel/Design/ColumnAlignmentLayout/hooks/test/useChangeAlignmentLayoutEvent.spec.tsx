import { renderHook } from '@testing-library/react';

// hooks
import { useChangeAlignmentLayoutEvent } from '../useChangeAlignmentEvent';

// types
import { AlignmentLayout } from 'types';

const mockCallBack = vi.fn();

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeAlignmentLayoutEvent', () => {
  it(`should trigger change event`, () => {
    // before
    const { result } = renderHook(() => useChangeAlignmentLayoutEvent(mockCallBack));

    // action
    result.current(AlignmentLayout.center);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(AlignmentLayout.center);
    expect(mockCallBack.mock.calls[1][0].payload).toBe(AlignmentLayout.center);
  });
});
