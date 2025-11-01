import { renderHook } from '@testing-library/react';

// hooks
import { useBlurGridEvents } from '../useBlurGridEvents';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurGridEvents', () => {
  it(`should trigger blur columns`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('1', elementMock.layout, '1', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumns();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ columns: 1 });
  });

  it(`should reset value columns`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('', elementMock.layout, '1', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumns();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });

  it(`should reset value columns when exceed`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('', elementMock.layout, '101', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumns();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });

  it(`should reset value columns when exceed`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('', elementMock.layout, '0', mockCallBack, mockCallBack));

    // action
    result.current.onBlurColumns();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });

  it(`should trigger blur rows`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('1', elementMock.layout, '1', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRows();

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ rows: 1 });
  });

  it(`should reset value rows`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('1', elementMock.layout, '', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRows();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });

  it(`should reset value rows when exceed`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('101', elementMock.layout, '', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRows();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });

  it(`should reset value rows when exceed`, () => {
    // before
    const { result } = renderHook(() => useBlurGridEvents('0', elementMock.layout, '', mockCallBack, mockCallBack));

    // action
    result.current.onBlurRows();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1');
  });
});
