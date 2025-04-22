import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import DropAnchors from './DropAnchors';

// mocks
import {
  elementDynamicDataMock,
  elementStaticDataMock,
  eventsMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore, store as storeToMock } from 'store/store';

// types
import { DropAnchorsPosition } from './enums';
import { E2EAttribute } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();
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

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('DropAnchors snapshots', () => {
  it('should render DropAnchors', () => {
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

  it('should render with prev prompt', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleIndexPosition: 0,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
            elements: {
              dynamicData: {
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
            },
          },
        },
      },
    });

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

  it('should render with next prompt', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...pageBuilderStateMock[PAGE_BUILDER],
        events: {
          ...eventsMock,
          draggableElements: [],
          possibleIndexPosition: 1,
          possibleParent: elementStaticDataMock.parentId,
        },
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
            elements: {
              dynamicData: {
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
            },
          },
        },
      },
    });

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

describe('DropAnchors behaviors', () => {
  it('should triiger event mouse enter', () => {
    // mock
    const store = configureStore(stateMock);
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...stateMock[PAGE_BUILDER],
          events: {
            ...eventsMock,
            draggableElements: ['1'],
          },
        },
      }) as any;

    // before
    const { container } = render(
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

    // action
    fireEvent.mouseEnter(
      getByE2EAttribute(
        container,
        E2EAttribute.anchor,
        DropAnchorsPosition.top,
      ),
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      possibleIndexPosition: 0,
    });
  });
});
