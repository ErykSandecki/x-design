import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import DropAnchors from './DropAnchors';

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
    elements: {
      dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
      staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
    },
  },
};

describe('DraggableArea snapshots', () => {
  it('should render DraggableArea', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <DropAnchors
          id={elementDynamicDataMock.id}
          index={0}
          mouseMode={MouseMode.default}
          parentId={elementStaticDataMock.parentId}
        >
          element
        </DropAnchors>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
