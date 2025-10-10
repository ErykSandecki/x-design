import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnFlow from './ColumnFlow';

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
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id, 'test-1'],
          },
          [elementMock.id]: elementMock,
          ['test-1']: { ...elementMock, id: 'test-1' },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnFlow snapshots', () => {
  it('should render ColumnFlow', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnFlow />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when values are mixed', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  type: LayoutType.grid,
                },
              },
            },
            selectedElements: [
              ...stateMock[PAGE_BUILDER].pages['0'].selectedElements,
              { ...selectedElementMock, id: 'test-2' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnFlow />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnFlow behaviors', () => {
  it('should change layout type', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnFlow />
      </Provider>,
    );

    // find
    const toggleButtonGroup = getByE2EAttribute(container, E2EAttribute.toggleButtonGroup, 'flow');
    const toggleButton = getByE2EAttribute(toggleButtonGroup, E2EAttribute.toggleButton, 3);

    // action
    fireEvent.click(toggleButton);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.type).toBe(LayoutType.grid);
  });
});
