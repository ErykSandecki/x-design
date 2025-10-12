import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

// components
import PossibleElement from './PossibleElement';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// mocks
import { eventsMock, pageBuilderStateMock, possibleElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// mocks
import 'test/mocks/sagas/allSagas';

// store
import { configureStore } from 'store/store';

// types
import { LayoutType } from 'types';

const overlayContainer = document.createElement('div');
const stateMock = {
  ...pageBuilderStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    events: {
      ...eventsMock,
      possibleElement: possibleElementMock,
    },
  },
};

describe('PossibleElement snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(overlayContainer);
  });

  it('should render PossibleElement', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <PossibleElement parentId="-1" possibleElement={possibleElementMock} />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when parent has position relative', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...stateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              ['-1']: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements['-1'],
                layout: {
                  ...stateMock[PAGE_BUILDER].pages['0'].elements['-1'].layout,
                  type: LayoutType.vertical,
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
        <RefsProvider overlayContainerRefHtml={overlayContainer}>
          <PossibleElement parentId="-1" possibleElement={possibleElementMock} />
        </RefsProvider>
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
