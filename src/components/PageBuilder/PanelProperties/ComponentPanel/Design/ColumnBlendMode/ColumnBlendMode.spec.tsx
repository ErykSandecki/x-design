import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnBlendMode from './ColumnBlendMode';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { BlendMode, E2EAttribute } from 'types';

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
            children: [elementMock.id, 'test-2'],
          },
          [elementMock.id]: {
            ...elementMock,
            mixBlendMode: BlendMode.color,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnBlendMode snapshots', () => {
  it('should render ColumnBlendMode', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnBlendMode />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render when initial', () => {
    // mock
    const store = configureStore({
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
                children: [elementMock.id, 'test-2'],
              },
              [elementMock.id]: elementMock,
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnBlendMode />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnBlendMode behaviors', () => {
  it('should select blend mode', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnBlendMode />
      </Provider>,
    );

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select, 'blend-mode');
    const selectOptions = getByE2EAttribute(select, E2EAttribute.selectOptions);
    const selectItem = getByE2EAttribute(selectOptions, E2EAttribute.selectItem, BlendMode.colorBurn);

    // action
    fireEvent.click(select);
    fireEvent.click(selectItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].mixBlendMode).toBe(BlendMode.colorBurn);
  });
});
