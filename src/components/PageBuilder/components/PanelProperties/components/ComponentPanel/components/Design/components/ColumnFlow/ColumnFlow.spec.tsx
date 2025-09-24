import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnFlow from './ColumnFlow';

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
              children: [elementAllDataMock.id, '2'],
            },
            [elementAllDataMock.id]: elementAllDataMock,
            ['2']: { ...elementAllDataMock, id: '2' },
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
            ['2']: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id, '2'],
            },
            [elementStaticDataMock.id]: elementStaticDataMock,
            ['2']: {
              ...elementStaticDataMock,
              id: '2',
            },
          },
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
    const { asFragment } = render(
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
              allData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.allData,
                ['2']: {
                  ...elementAllDataMock,
                  id: '2',
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                ['2']: {
                  ...elementDynamicDataMock,
                  id: '2',
                  layout: {
                    ...layoutMock,
                    type: LayoutType.grid,
                  },
                },
              },
            },
            selectedElements: [
              ...stateMock[PAGE_BUILDER].pages['0'].selectedElements,
              { ...selectedElementMock, id: '2' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
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
    const { container } = render(
      <Provider store={store}>
        <ColumnFlow />
      </Provider>,
    );

    // find
    const toggleButtonGroup = getByE2EAttribute(
      container,
      E2EAttribute.toggleButtonGroup,
      'flow',
    );
    const toggleButton = getByE2EAttribute(
      toggleButtonGroup,
      E2EAttribute.toggleButton,
      3,
    );

    // action
    fireEvent.click(toggleButton);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1'].layout
        .type,
    ).toBe(LayoutType.grid);
  });
});
