import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import GridDropArea from './GridDropArea';

// mocks
import { eventsMock, pageBuilderStateMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore, store } from 'store/store';

// types
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getByE2EAttribute } from 'test';

const stateMock = {
  ...wholeStateMock,
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
  },
};

describe('DropAnchors snapshots', () => {
  it('should render DropAnchors', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <GridDropArea index={0} mouseMode={MouseMode.default} parentId="-1" />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('GridDropArea behaviors', () => {
  beforeAll(() => {
    // mock
    window.store = store;
  });

  it('should triger event mouse enter', () => {
    // mock
    const store = configureStore(stateMock);

    // mock
    window.store.getState = (): any =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['test-1'],
          },
        },
      }) as any;

    // before
    const { container } = render(
      <Provider store={store}>
        <GridDropArea index={0} mouseMode={MouseMode.default} parentId="-1" />
      </Provider>,
    );

    // action
    fireEvent.mouseEnter(getByE2EAttribute(container, E2EAttribute.box, 'grid-drop-area'));

    // result
    expect(store.getState()[PAGE_BUILDER].events).toStrictEqual({
      ...eventsMock,
      isGridDropArea: true,
      possibleIndexPosition: 0,
      possibleParent: '-1',
    });
  });
});
