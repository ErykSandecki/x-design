import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAlignment from './ColumnAlignment';

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
});
