import { renderHook } from '@testing-library/react';

// hooks
import { useResizingEvents } from '../useResizingEvents';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
  useSelector: (): any => '',
}));

describe('useResizingEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() =>
      useResizingEvents(elementAllDataMock, false, false, false),
    );

    // result
    expect(result.current).toStrictEqual({
      height: '100',
      onBlurHeight: expect.any(Function),
      onBlurWidth: expect.any(Function),
      onChangeHeight: expect.any(Function),
      onChangeWidth: expect.any(Function),
      width: '100',
    });
  });
});
