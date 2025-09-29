import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAlignment from './ColumnAlignment';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute } from 'types';

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
          ...currentPage.elements,
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id],
          },
          [elementMock.id]: {
            ...elementMock,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnAlignment snapshots', () => {
  it('should render ColumnAlignment', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnAlignment />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when element is on position relative', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...currentPage.elements,
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                children: ['test-2'],
                position: 'absolute',
              },
              ['test-2']: {
                ...elementMock,
                children: [],
                id: 'test-2',
                parentId: 'test-1',
                position: 'relative',
              },
            },
            selectElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnAlignment />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnAlignment behaviors', () => {
  it('should change alignments', () => {
    // mock
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');
    const parentId = 'test-1';
    const childrenId = 'test-2';

    // before
    el1.setAttribute('id', parentId);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', childrenId);
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...currentPage.elements,
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                children: ['test-2'],
                position: 'absolute',
              },
              ['test-2']: {
                ...elementMock,
                children: [],
                id: 'test-2',
                parentId: 'test-1',
                position: 'absolute',
              },
            },
            selectedElements: [{ ...selectedElementMock, id: childrenId, parentId }],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnAlignment />
      </Provider>,
    );

    // find
    const horizontalButtonGroup = getByE2EAttribute(container, E2EAttribute.buttonGroup, 'horizontal-alignment');

    // action
    fireEvent.click(getByE2EAttribute(horizontalButtonGroup, E2EAttribute.buttonGroupInput, 'align-horizontal-left'));

    // find
    const verticalButtonGroup = getByE2EAttribute(container, E2EAttribute.buttonGroup, 'vertical-alignment');

    // action
    fireEvent.click(getByE2EAttribute(verticalButtonGroup, E2EAttribute.buttonGroupInput, 'align-vertical-top'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].alignment).toStrictEqual({
      horizontal: 'left',
      vertical: 'top',
    });
  });
});
