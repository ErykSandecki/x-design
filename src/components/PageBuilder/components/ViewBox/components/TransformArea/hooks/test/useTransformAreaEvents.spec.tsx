import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useTransformAreaEvents } from '../useTransformAreaEvents';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// store
import { configureStore } from 'store';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const elementRef = {
  current: {
    getBoundingClientRect: () => ({ height: 100, left: 0, top: 0, width: 100 }),
  },
} as RefObject<HTMLDivElement>;

const stateMock = {
  ...pageBuilderStateMock,
};

describe('useTransformAreaEvents', () => {
  it(`should return view moveable events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useTransformAreaEvents(
          elementRef,
          100,
          selectedElementMock.id,
          MouseMode.default,
          0,
          100,
          100,
          100,
        ),
      {
        wrapper: getProviderWrapper(store),
      },
    );

    // result
    expect(result.current).toStrictEqual({
      onMouseDownAnchorResize: expect.any(Function),
      onMouseDownAnchorRotate: expect.any(Function),
    });
  });
});
