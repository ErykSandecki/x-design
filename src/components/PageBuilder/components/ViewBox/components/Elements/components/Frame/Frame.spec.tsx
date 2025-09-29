import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Frame from './Frame';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import {
  elementMock,
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
import { MouseMode } from 'types/enums/mouseMode';

const element = document.createElement('div');
const overlayContainer = document.createElement('div');

const sharedRefs = {
  [elementMock.id]: element,
};

const stateMock = {
  ...wholeStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements,
          allData: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements.allData,
            [elementMock.id]: elementMock,
          },
          dynamicData: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements.staticData,
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
      },
    },
  },
};

describe('Frame snapshots', () => {
  beforeAll(() => {
    element.style.height = '100px';
    element.style.width = '100px';
    document.body.appendChild(overlayContainer);
  });

  it('should render Frame', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Frame
            className="className"
            id={elementDynamicDataMock.id}
            index={0}
            mouseMode={MouseMode.default}
            parentId={elementStaticDataMock.parentId}
            type={elementStaticDataMock.type}
          />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
