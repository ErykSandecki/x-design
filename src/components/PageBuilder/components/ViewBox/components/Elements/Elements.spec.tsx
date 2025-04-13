import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import Elements from './Elements';

// mocks
import {
  elementAllDataMock,
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
import { ElementType } from 'types';

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
        <Elements
          eventsDisabled={false}
          mouseMode={MouseMode.default}
          parentId="-1"
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Element in relative position', () => {
    // mock
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
              position: 'relative',
            },
          },
          dynamicData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: {
              ...elementDynamicDataMock,
              position: 'relative',
            },
          },
          staticData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
              position: 'relative',
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Elements
          eventsDisabled={false}
          mouseMode={MouseMode.default}
          parentId="-1"
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render Frame', () => {
    // mock
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Elements
          eventsDisabled={false}
          mouseMode={MouseMode.default}
          parentId="-1"
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render default Element', () => {
    // mock
    const store = configureStore({
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
              type: ElementType.none,
            },
          },
          dynamicData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
              type: ElementType.none,
            },
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <Elements
          eventsDisabled={false}
          mouseMode={MouseMode.default}
          parentId="-1"
        />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
