import { renderHook } from '@testing-library/react';

// hooks
import { useRotationEvents } from '../useRotationEvents';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
  useSelector: () => '',
}));

describe('useRotationEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() =>
      useRotationEvents(elementAllDataMock, false, false),
    );

    // result
    expect(result.current).toStrictEqual({
      angle: '0',
      onBlur: expect.any(Function),
      onChange: expect.any(Function),
      onMouseDown: expect.any(Function),
    });
  });
});
