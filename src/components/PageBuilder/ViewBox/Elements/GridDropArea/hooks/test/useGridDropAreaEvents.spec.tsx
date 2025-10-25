import { renderHook } from '@testing-library/react';

// hooks
import { useGridDropAreaEvents } from '../useGridDropAreaEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useGridDropAreaEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useGridDropAreaEvents(0, MouseMode.default, '-1'), {
      wrapper: getProviderWrapper(store),
    });

    // result
    expect(result.current).toStrictEqual({
      isHovered: false,
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
    });
  });
});
