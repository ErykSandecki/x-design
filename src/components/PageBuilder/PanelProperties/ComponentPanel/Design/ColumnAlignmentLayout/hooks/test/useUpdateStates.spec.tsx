import { renderHook } from '@testing-library/react';

// hooks
import { useUpdateStates } from '../useUpdateStates';

// mocks
import { layoutMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

describe('useUpdateStates', () => {
  it(`should trigger set updates`, () => {
    // before
    renderHook(() =>
      useUpdateStates(
        false,
        false,
        false,
        false,
        false,
        false,
        layoutMock,
        mockCallBack,
        mockCallBack,
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('none');
    expect(mockCallBack.mock.calls[1][0]).toBe('0');
    expect(mockCallBack.mock.calls[2][0]).toBe('0');
    expect(mockCallBack.mock.calls[3][0]).toBe('1');
    expect(mockCallBack.mock.calls[4][0]).toBe('1');
  });

  it(`should trigger set updates whe mixed`, () => {
    // before
    renderHook(() =>
      useUpdateStates(
        true,
        true,
        true,
        true,
        true,
        true,
        layoutMock,
        mockCallBack,
        mockCallBack,
        mockCallBack,
        mockCallBack,
        mockCallBack,
      ),
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe('none');
    expect(mockCallBack.mock.calls[1][0]).toBe('Mixed');
    expect(mockCallBack.mock.calls[2][0]).toBe('Mixed');
    expect(mockCallBack.mock.calls[3][0]).toBe('Mixed');
    expect(mockCallBack.mock.calls[4][0]).toBe('Mixed');
  });
});
