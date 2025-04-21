import { KeyboardEvent } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useKeyDownEvent } from '../useKeyDownEvent';

// types
import { KeyboardKeys } from 'types';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useKeyDownEvent', () => {
  it(`should trigger event`, () => {
    // before
    const { result } = renderHook(() => useKeyDownEvent());

    // action
    result.current({ key: KeyboardKeys.control } as KeyboardEvent);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      pressedKey: KeyboardKeys.control,
    });
  });
});
