import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import PanelProperties from './PanelProperties';

// mocks
import {
  childrenMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';
import 'test/mocks/sagas/allSagas';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, MouseButton } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('PanelProperties snapshots', () => {
  it('should render PanelProperties', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <PanelProperties />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when some element is selected', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        ...pageBuilderStateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [childrenMock],
              },
              [elementMock.id]: {
                ...elementMock,
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <PanelProperties />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with changed width', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <PanelProperties />
      </Provider>,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.resize), {
      buttons: MouseButton.lmb,
    });
    fireEvent.mouseMove(document, { clientX: 500 });

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('PanelProperties behaviors', () => {
  it('should stop propagation on key down', () => {
    // mock
    const store = configureStore();

    // before
    const { container } = customRender(
      <Provider store={store}>
        <div onKeyDown={mockCallBack}>
          <PanelProperties />
        </div>
      </Provider>,
    );

    // action
    fireEvent.keyDown(getByE2EAttribute(container, E2EAttribute.box, 'panel-properties'));

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
