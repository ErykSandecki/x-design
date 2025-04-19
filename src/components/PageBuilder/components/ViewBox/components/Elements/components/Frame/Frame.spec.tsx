import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Frame from './Frame';

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

// types
import { MouseMode } from 'components/PageBuilder/enums';

const stateMock = {
  ...wholeStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
          staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
        },
      },
    },
  },
};

describe('Frame snapshots', () => {
  it('should render Frame', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Frame
          className="className"
          id={elementDynamicDataMock.id}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
          type={elementStaticDataMock.type}
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
