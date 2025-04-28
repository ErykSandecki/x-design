import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnPosition from './ColumnPosition';

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

describe('ColumnPosition snapshots', () => {
  it('should render ColumnPosition', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnPosition />
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
                  coordinates: { x: 100, y: 100 },
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
                  coordinates: { x: 100, y: 100 },
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
        <ColumnPosition />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnPosition behaviors', () => {
  it('should change positions X & Y when enter value on input', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnPosition />
      </Provider>,
    );

    // find
    const inputX = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'x',
    );
    const inputY = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'y',
    );

    // action
    fireEvent.click(inputX);
    fireEvent.change(inputX, { target: { value: '100' } });
    fireEvent.keyDown(inputX, { key: KeyboardKeys.enter });
    fireEvent.blur(inputX);
    fireEvent.click(inputY);
    fireEvent.change(inputY, { target: { value: '100' } });
    fireEvent.keyDown(inputY, { key: KeyboardKeys.enter });
    fireEvent.blur(inputY);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1']
        .coordinates,
    ).toStrictEqual({ x: 100, y: 100 });
  });

  it('should change positions X & Y when triger ScrubbableInput', () => {
    // mock
    const store = configureStore(stateMock);
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
      view: window,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: -100 });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnPosition />
      </Provider>,
    );

    // find
    const scrubbableInputX = getByE2EAttribute(
      container,
      E2EAttribute.scrubbableInput,
      'x',
    );
    const scrubbableInputY = getByE2EAttribute(
      container,
      E2EAttribute.scrubbableInput,
      'y',
    );

    // action
    fireEvent.mouseDown(scrubbableInputX, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputX);
    fireEvent.mouseDown(scrubbableInputY, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputY);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['1']
        .coordinates,
    ).toStrictEqual({ x: -50, y: -50 });
  });
});
