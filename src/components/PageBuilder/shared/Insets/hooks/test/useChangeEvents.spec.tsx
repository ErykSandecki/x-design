import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvents } from '../useChangeEvents';

// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useBlurEvent', () => {
  it(`should trigger change inset to state`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        insetsMock,
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInset('1', 'b', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ b: '1', l: '0', r: '0', t: '0' });
  });

  it(`should trigger change inset to store`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        insetsMock,
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInset('1', 'b', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ b: '1', l: '0', r: '0', t: '0' });
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ insets: { b: { value: 1 } }, name: 'padding' });
  });

  it(`should trigger change insetLR to state`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        insetsMock,
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInsetLR('0, 1', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
  });

  it(`should trigger change insetLR to store`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0, 1',
        insetsMock,
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInsetLR('1', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1, 2');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      insets: { l: { value: 1 }, r: { value: 2 } },
      name: 'padding',
    });
  });

  it(`should trigger change insetTB to state`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        insetsMock,
        '0',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInsetTB('0, 1', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('0, 1');
  });

  it(`should trigger change insetTB to store`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvents(
        { b: '0', l: '0', r: '0', t: '0' },
        '0',
        insetsMock,
        '0, 1',
        'padding',
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // action
    result.current.onChangeInsetTB('1', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('1, 2');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      insets: { b: { value: 2 }, t: { value: 1 } },
      name: 'padding',
    });
  });
});
