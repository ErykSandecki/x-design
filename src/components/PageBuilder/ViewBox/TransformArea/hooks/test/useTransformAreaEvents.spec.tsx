import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useTransformAreaEvents } from '../useTransformAreaEvents';

// mocks
import { flipMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

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
  it(`should return events`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useTransformAreaEvents(
          0,
          0,
          elementRef,
          flipMock,
          100,
          selectedElementMock.id,
          MouseMode.default,
          100,
          100,
          100,
        ),
      {
        wrapper: (children) => <RefsProvider>{getProviderWrapper(store)(children)}</RefsProvider>,
      },
    );

    // result
    expect(result.current).toStrictEqual({
      onMouseDownAnchorResize: expect.any(Function),
      onMouseDownAnchorRotate: expect.any(Function),
      onMouseEnterAnchorResize: expect.any(Function),
      onMouseEnterAnchorRotate: expect.any(Function),
      onMouseLeaveAnchorResize: expect.any(Function),
      onMouseLeaveAnchorRotate: expect.any(Function),
    });
  });
});
