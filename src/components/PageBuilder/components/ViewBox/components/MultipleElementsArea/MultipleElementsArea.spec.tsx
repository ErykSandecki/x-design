import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import MultipleElementsArea from './MultipleElementsArea';

// mocks
import {
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    selectedElements: {
      [selectedElementMock.id]: selectedElementMock,
      ['2']: {
        ...selectedElementMock,
        id: '2',
      },
    },
  },
};

describe('MultipleElementsArea snapshots', () => {
  it('should render MultipleElementsArea', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <MultipleElementsArea />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render MultipleElementsArea', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <MultipleElementsArea />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
