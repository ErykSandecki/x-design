import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementEvents } from '../useElementEvents';

// mocks
import {
  elementMock,
  flipMock,
  insetsMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// types
import { ElementType } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getProviderWrapper } from 'test';

const ref = { current: { contains: () => false } } as RefObject<any>;
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...currentPage,
        elements: {
          ...currentPage.elements,
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id],
          },
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('useElementEvents', () => {
  it(`should return view moveable events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () =>
        useElementEvents(
          ref,
          selectedElementMock.id,
          MouseMode.default,
          selectedElementMock.parentId,
          ElementType.frame,
        ),
      {
        wrapper: ({ children }) => {
          const Wrapper = getProviderWrapper(store);

          return (
            <Wrapper>
              <RefsProvider>{children}</RefsProvider>
            </Wrapper>
          );
        },
      },
    );

    // result
    expect(result.current).toStrictEqual({
      alignment: {},
      angle: 0,
      background: {
        properties: {
          alpha: '100',
          color: '#ffffff',
          format: 'hex',
        },
        visible: true,
      },
      coordinates: {
        x: 0,
        y: 0,
      },
      cssHeight: '100px',
      cssWidth: '100px',
      displayEventsArea: true,
      displayOutline: true,
      flip: flipMock,
      height: 100,
      isHover: false,
      isMoving: false,
      isSelected: true,
      layout: layoutMock,
      maxHeight: '',
      maxWidth: '',
      minHeight: '',
      minWidth: '',
      onMouseDown: expect.any(Function),
      onMouseEnter: expect.any(Function),
      onMouseLeave: expect.any(Function),
      padding: insetsMock,
      position: 'absolute',
      showDropAnchors: false,
      width: 100,
      x: 0,
      y: 0,
    });
  });
});
