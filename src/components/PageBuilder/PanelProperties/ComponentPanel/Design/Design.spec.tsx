import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import Design from './Design';

// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, LayoutType } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

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
          [elementMock.id]: {
            ...elementMock,
            children: ['test-2'],
            layout: {
              ...layoutMock,
              type: LayoutType.horizontal,
            },
          },
          ['test-2']: {
            ...elementMock,
            id: 'test-2',
            parentId: elementMock.id,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('Design snapshots', () => {
  it('should render Design', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <Design width={0} />
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
            selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'position-switcher'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].position).toBe('relative');
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
            selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.type).toBe(LayoutType.vertical);
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
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id, 'test-2'],
              },
              [elementMock.id]: {
                ...elementMock,
                children: [],
                layout: {
                  ...layoutMock,
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                parentId: '-1',
              },
            },
            selectedElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2', parentId: '-1' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.type).toBe(LayoutType.vertical);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.type).toBe(LayoutType.vertical);
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
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id, 'test-2'],
              },
              [elementMock.id]: {
                ...elementMock,
                children: [],
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...layoutMock,
                  type: LayoutType.vertical,
                },
                parentId: '-1',
              },
            },
            selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: '-1' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'auto-layout'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.type).toBe(LayoutType.freeForm);
  });

  it('should fit layout', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'fit-layout'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.value).toBe('auto');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.value).toBe('auto');
  });

  it('should change visibility', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            selectedElements: [{ ...selectedElementMock, id: 'test-2', parentId: 'test-1' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Design width={0} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.icon, 'eyes-opened'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].visible).toBe(false);
  });
});
