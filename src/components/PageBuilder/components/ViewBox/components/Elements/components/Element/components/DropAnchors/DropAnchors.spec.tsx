import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import DropAnchors from './DropAnchors';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  eventsMock,
  layoutMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore, store as storeToMock } from 'store/store';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { E2EAttribute, LayoutType } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...wholeStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...currentPage,
        elements: {
          allData: {
            ['-1']: {
              ...currentPage.elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
            },
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
            },
          },
        },
      },
    },
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('DropAnchors snapshots', () => {
  it('should render DropAnchors', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with prev prompt for top', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.top,
          possibleParent: elementStaticDataMock.parentId,
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with prev prompt for left', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.left,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.horizontal,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.horizontal,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with next prompt for bottom', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.bottom,
          possibleParent: elementStaticDataMock.parentId,
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with next prompt for right', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.right,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.horizontal,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.horizontal,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render some prompt when grid for top', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.top,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render some prompt when grid for left', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.left,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render some prompt when grid for bottom', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.bottom,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render some prompt when grid for right', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleAnchorElementId: '1',
          possibleAnchorPosition: DropAnchorsPosition.right,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementAllDataMock.id]: elementAllDataMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('DropAnchors behaviors', () => {
  it('should triger event mouse enter', () => {
    // mock
    const store = configureStore(stateMock);
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['1'],
          },
        },
      }) as any;

    // before
    const { container } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        />
      </Provider>,
    );

    // action
    fireEvent.mouseEnter(
      getByE2EAttribute(
        container,
        E2EAttribute.anchor,
        DropAnchorsPosition.top,
      ),
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleAnchorElementId: '1',
      possibleAnchorPosition: DropAnchorsPosition.top,
      possibleIndexPosition: 0,
      possibleParent: '-1',
    });
  });
});
