import { renderHook } from '@testing-library/react';

// hooks
import { useDropAnchorsEvents } from '../useDropAnchorsEvents';

// mocks
import { pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { getProviderWrapper } from 'test';

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useDropAnchorsEvents', () => {
  it(`should return view drop anchors events`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useDropAnchorsEvents(0, MouseMode.default),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current).toStrictEqual({
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
    });
  });
});
