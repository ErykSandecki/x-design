import { Provider } from 'react-redux';

// components
import ColumnClipContent from './ColumnClipContent';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// utils
import { customRender, getByE2EAttribute } from 'test';
import { fireEvent } from '@testing-library/react';
import { E2EAttribute } from 'types';

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
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnMargin snapshots', () => {
  it('should render ColumnMargin', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnClipContent />
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
              [elementMock.id]: elementMock,
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnClipContent />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnMargin snapshots', () => {
  it('should change column clip', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnClipContent />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.checkboxInput, 'clip-content'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].clipContent).toBe(false);
  });
});
