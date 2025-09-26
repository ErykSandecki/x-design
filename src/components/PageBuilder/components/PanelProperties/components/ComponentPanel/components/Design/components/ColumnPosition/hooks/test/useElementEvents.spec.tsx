import { renderHook } from '@testing-library/react';

// hooks
import { usePositionEvents } from '../usePositionEvents';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
  useSelector: (): any => '',
}));

describe('usePositionEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() =>
      usePositionEvents(elementAllDataMock, false, false, false, false),
    );

    // result
    expect(result.current).toStrictEqual({
      onBlurX: expect.any(Function),
      onBlurY: expect.any(Function),
      onChangeX: expect.any(Function),
      onChangeY: expect.any(Function),
      onMouseDown: expect.any(Function),
      x: '0',
      y: '0',
    });
  });
});
