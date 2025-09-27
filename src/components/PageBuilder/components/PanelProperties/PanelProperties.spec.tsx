import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import PanelProperties from './PanelProperties';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
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
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
};

describe('PanelProperties snapshots', () => {
  it('should render PanelProperties', () => {
    // mock
    const store = configureStore();

    // before
    const { asFragment } = render(
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
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                },
                [elementDynamicDataMock.id]: elementDynamicDataMock,
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: {
                  ...elementStaticDataMock,
                },
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
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
    const { asFragment, container } = render(
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
    const { container } = render(
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
