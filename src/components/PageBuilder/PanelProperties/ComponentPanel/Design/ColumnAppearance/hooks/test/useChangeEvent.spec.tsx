import { renderHook } from '@testing-library/react';

// hooks
import { useChangeEvent } from '../useChangeEvent';

// mocks
import { insetsMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useChangeEvent', () => {
  it(`should trigger change border radius from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(insetsMock, { mode: 'fixed', value: 100 }, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeBorderRadius('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change border radius from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(insetsMock, { mode: 'fixed', value: 100 }, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeBorderRadius('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({
      borderRadius: {
        b: { mode: 'fixed', value: 100 },
        l: { mode: 'fixed', value: 100 },
        r: { mode: 'fixed', value: 100 },
        t: { mode: 'fixed', value: 100 },
      },
    });
  });

  it(`should trigger change opacity from text field`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(insetsMock, { mode: 'fixed', value: 100 }, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeOpacity('100', false);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
  });

  it(`should trigger change opacity from scrubbable input`, () => {
    // before
    const { result } = renderHook(() =>
      useChangeEvent(insetsMock, { mode: 'fixed', value: 100 }, mockCallBack, mockCallBack),
    );

    // action
    result.current.onChangeOpacity('100', true);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('100');
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ opacity: { mode: 'fixed', value: 100 } });
  });
});
