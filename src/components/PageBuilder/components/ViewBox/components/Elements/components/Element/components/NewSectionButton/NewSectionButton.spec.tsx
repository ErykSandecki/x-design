import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import NewSectionButton from './NewSectionButton';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_RECT } from 'shared';
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    elements: {
      allData: {
        [elementAllDataMock.id]: elementAllDataMock,
      },
      dynamicData: {
        [elementDynamicDataMock.id]: elementDynamicDataMock,
      },
      staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
    },
  },
};

describe('Element snapshots', () => {
  it('should render NewSectionButton', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <NewSectionButton position="top" rectCoordinates={BASE_RECT} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
