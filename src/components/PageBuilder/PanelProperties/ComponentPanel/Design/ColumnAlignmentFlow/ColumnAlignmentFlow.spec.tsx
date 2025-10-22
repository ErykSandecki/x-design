import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAlignmentFlow from './ColumnAlignmentFlow';

// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { AlignmentLayout, E2EAttribute, LayoutType } from 'types';

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
          [elementMock.id]: {
            ...elementMock,
            layout: {
              ...layoutMock,
              alignment: AlignmentLayout.topLeft,
              type: LayoutType.horizontal,
            },
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnAlignmentFlow snapshots', () => {
  it('should render ColumnAlignmentFlow', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentFlow />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is free form', () => {
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
                  alignment: AlignmentLayout.none,
                  type: LayoutType.freeForm,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentFlow />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when layout types are mixed', () => {
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
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
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
        <ColumnAlignmentFlow />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnAlignmentFlow behaviors', () => {
  it('should change alignment', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentFlow />
      </Provider>,
    );

    // find
    const aligmentArea = getByE2EAttribute(container, E2EAttribute.alignmentArea, 'alignment-flow');
    const alignmentOption = getByE2EAttribute(aligmentArea, E2EAttribute.alignmentAreaOption, AlignmentLayout.center);

    // action
    fireEvent.click(alignmentOption);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.alignment).toBe(AlignmentLayout.center);
  });
});
