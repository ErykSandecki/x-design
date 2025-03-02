import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Elements from './Elements';

// mocks
import {
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

const stateMock = {
  ...wholeStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
  },
};

describe('Elements snapshots', () => {
  it('should render Elements', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Elements />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Frame', () => {
    // mock
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        elements: {
          dynamicData: [elementDynamicDataMock],
          staticData: [elementStaticDataMock],
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Elements />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
