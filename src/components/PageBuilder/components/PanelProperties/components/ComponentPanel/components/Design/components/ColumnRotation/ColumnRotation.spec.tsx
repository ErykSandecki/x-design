import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnRotation from './ColumnRotation';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
const stateMock = {
  ...pageBuilderStateMock,
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
};

describe('ColumnRotation snapshots', () => {
  it('should render ColumnRotation', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when values are mixed', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ['0']: {
            ...stateMock[PAGE_BUILDER].pages['0'],
            elements: {
              ...stateMock[PAGE_BUILDER].pages['0'].elements,
              allData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.allData,
                ['-1']: {
                  ...stateMock[PAGE_BUILDER].pages['0'].elements.allData['-1'],
                  children: ['1', '2'],
                },
                ['2']: {
                  ...elementAllDataMock,
                  angle: 100,
                  id: '2',
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                ['-1']: {
                  ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData[
                    '-1'
                  ],
                  children: ['1', '2'],
                },
                ['2']: {
                  ...elementDynamicDataMock,
                  angle: 100,
                  id: '2',
                },
              },
              staticData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.staticData,
                ['-1']: {
                  ...stateMock[PAGE_BUILDER].pages['0'].elements.staticData[
                    '-1'
                  ],
                  children: ['1', '2'],
                },
                ['2']: {
                  ...elementStaticDataMock,
                  id: '2',
                },
              },
            },
            selectedElements: [
              ...stateMock[PAGE_BUILDER].pages['0'].selectedElements,
              { ...selectedElementMock, id: '2' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnRotation behaviors', () => {
  it('should change angle when enter value on input', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const inputX = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'angle',
    );

    // action
    fireEvent.click(inputX);
    fireEvent.change(inputX, { target: { value: '100' } });
    fireEvent.keyDown(inputX, { key: KeyboardKeys.enter });
    fireEvent.blur(inputX);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1'].angle,
    ).toBe(100);
  });

  it('should change anle when triger ScrubbableInput', () => {
    // mock
    const store = configureStore(stateMock);
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
      view: window,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: -200 });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const scrubbableInput = getByE2EAttribute(
      container,
      E2EAttribute.scrubbableInput,
      'angle',
    );

    // action
    fireEvent.mouseDown(scrubbableInput, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInput);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1'].angle,
    ).toBe(-100);
  });
});
