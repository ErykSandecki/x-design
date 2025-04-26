import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnHeader from './ColumnHeader';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...currentPage,
        selectElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnHeader snapshots', () => {
  it('should render ColumnHeader', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnHeader />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with multiple selects', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            selectElements: [
              selectedElementMock,
              { ...selectedElementMock, id: '2' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnHeader />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
