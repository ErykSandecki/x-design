import { Provider } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

// components
import Design from './Design';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, LayoutType } from 'types';

// utils
import { getByE2EAttribute } from 'test';

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
          allData: {
            ['-1']: {
              ...currentPage.elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
              children: ['2'],
              layout: {
                ...layoutMock,
                type: LayoutType.grid,
              },
            },
            ['2']: {
              ...elementAllDataMock,
              id: '2',
              parentId: elementAllDataMock.id,
            },
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: {
              ...elementDynamicDataMock,
              layout: {
                ...layoutMock,
                type: LayoutType.grid,
              },
            },
            ['2']: {
              ...elementDynamicDataMock,
              id: '2',
            },
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
              children: ['2'],
            },
            ['2']: {
              ...elementStaticDataMock,
              id: '2',
              parentId: elementStaticDataMock.id,
            },
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('Design snapshots', () => {
  it('should render Design', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when parents are not the same', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [
              selectedElementMock,
              { ...selectedElementMock, id: '2', parentId: '1' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Design behaviors', () => {
  it('should change position', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [
              { ...selectedElementMock, id: '2', parentId: '1' },
            ],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.icon, 'position-switcher'),
    );

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['2'].position,
    ).toBe('relative');
  });

  it('should change layout', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [
              { ...selectedElementMock, id: '2', parentId: '1' },
            ],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'),
    );

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['2'].layout
        .type,
    ).toBe(LayoutType.vertical);
  });

  it('should change layout to vertical when mixed', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id, '2'],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  children: [],
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                ['2']: {
                  ...elementAllDataMock,
                  id: '2',
                  parentId: '-1',
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                },
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
                ['2']: {
                  ...elementDynamicDataMock,
                  id: '2',
                },
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id, '2'],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  children: [],
                },
                ['2']: {
                  ...elementStaticDataMock,
                  id: '2',
                  parentId: '-1',
                },
              },
            },
            selectedElements: [
              selectedElementMock,
              { ...selectedElementMock, id: '2', parentId: '-1' },
            ],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'),
    );

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1'].layout
        .type,
    ).toBe(LayoutType.vertical);
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['2'].layout
        .type,
    ).toBe(LayoutType.vertical);
  });

  it('should change layout to default when vertical', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id, '2'],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  children: [],
                },
                ['2']: {
                  ...elementAllDataMock,
                  id: '2',
                  layout: {
                    ...layoutMock,
                    type: LayoutType.vertical,
                  },
                  parentId: '-1',
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                },
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                },
                ['2']: {
                  ...elementDynamicDataMock,
                  id: '2',
                  layout: {
                    ...layoutMock,
                    type: LayoutType.vertical,
                  },
                },
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id, '2'],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  children: [],
                },
                ['2']: {
                  ...elementStaticDataMock,
                  id: '2',
                  parentId: '-1',
                },
              },
            },
            selectedElements: [
              { ...selectedElementMock, id: '2', parentId: '-1' },
            ],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <Design />
      </Provider>,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'),
    );

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['2'].layout
        .type,
    ).toBe(LayoutType.default);
  });
});
