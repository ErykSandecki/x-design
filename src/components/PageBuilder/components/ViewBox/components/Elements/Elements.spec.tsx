import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Elements from './Elements';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import {
  childrenMock,
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
import { ElementType } from 'types';
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
  },
};

describe('Elements snapshots', () => {
  it('should render Elements', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Elements eventsDisabled={false} id="-1" mouseMode={MouseMode.default} parentId="-1" />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element in relative position', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [childrenMock],
                },
                [elementMock.id]: {
                  ...elementMock,
                  position: 'relative',
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [childrenMock],
                },
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  position: 'relative',
                },
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [childrenMock],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  position: 'relative',
                },
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Elements eventsDisabled={false} id="-1" mouseMode={MouseMode.default} parentId="-1" />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Frame', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [childrenMock],
                },
                [elementMock.id]: elementMock,
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [childrenMock],
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [childrenMock],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Elements eventsDisabled={false} id="-1" mouseMode={MouseMode.default} parentId="-1" />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default Element', () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          ['0']: {
            ...currentPage,
            elements: {
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [{ ...childrenMock, type: ElementType.none }],
                },
                [elementMock.id]: {
                  ...elementMock,
                  type: ElementType.none,
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [{ ...childrenMock, type: ElementType.none }],
                },
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  type: ElementType.none,
                },
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [{ ...childrenMock, type: ElementType.none }],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                  type: ElementType.none,
                },
              },
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider itemsRefs={sharedRefs} overlayContainerRefHtml={overlayContainer}>
          <Elements eventsDisabled={false} id="-1" mouseMode={MouseMode.default} parentId="-1" />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
