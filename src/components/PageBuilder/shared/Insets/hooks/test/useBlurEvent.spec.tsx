import { renderHook } from '@testing-library/react';

// hooks
import { useBlurEvents } from '../useBlurEvents';

// mocks
import { elementMock, insetsMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger blur inset to store`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        elementMock,
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInset('b');

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({ insets: { b: { value: 0 } }, name: 'padding' });
  });

  it(`should trigger blur reset value`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        elementMock,
        { b: '', l: '0', r: '0', t: '0' },
        '0',
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInset('b');

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ b: '0', l: '0', r: '0', t: '0' });
  });

  it(`should trigger blur insetLR to store`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        elementMock,
        { b: '0', l: '0', r: '0', t: '0' },
        '0, 1',
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInsetLR();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      insets: { l: { value: 0 }, r: { value: 1 } },
      name: 'padding',
    });
  });

  it(`should trigger blur reset value`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        { ...elementMock, padding: { ...insetsMock, l: { value: 0 }, r: { value: 1 } } },
        { b: '0', l: '0', r: '0', t: '0' },
        '',
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInsetLR();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
  });

  it(`should trigger blur insetTB to store`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        elementMock,
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        '0, 1',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInsetTB();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      insets: { b: { value: 1 }, t: { value: 0 } },
      name: 'padding',
    });
  });

  it(`should trigger blur reset value`, () => {
    // before
    const { result } = renderHook(() =>
      useBlurEvents(
        { ...elementMock, padding: { ...insetsMock, b: { value: 1 }, t: { value: 0 } } },
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        '',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onBlurInsetTB();

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
  });
});
