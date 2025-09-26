import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnResizing from './ColumnResizing';

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
              children: [elementAllDataMock.id, 'test-2'],
            },
            [elementAllDataMock.id]: elementAllDataMock,
            ['test-2']: { ...elementAllDataMock, id: 'test-2' },
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
            ['test-2']: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id, 'test-2'],
            },
            [elementStaticDataMock.id]: elementStaticDataMock,
            ['test-2']: {
              ...elementStaticDataMock,
              id: 'test-2',
            },
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnResizing snapshots', () => {
  it('should render ColumnResizing', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnResizing />
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
                ['test-2']: {
                  ...elementAllDataMock,
                  height: '1000',
                  id: 'test-2',
                  width: '1000',
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                ['test-2']: {
                  ...elementDynamicDataMock,
                  height: '1000',
                  id: 'test-2',
                  width: '1000',
                },
              },
            },
            selectedElements: [
              ...stateMock[PAGE_BUILDER].pages['0'].selectedElements,
              { ...selectedElementMock, id: 'test-2' },
            ],
          },
        },
      },
    });

    // before
    const { asFragment } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnResizing behaviors', () => {
  it('should change width & height when enter value on input', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find
    const inputHeight = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'height',
    );
    const inputWidth = getByE2EAttribute(
      container,
      E2EAttribute.textFieldInput,
      'width',
    );

    // action
    fireEvent.click(inputHeight);
    fireEvent.change(inputHeight, { target: { value: '10000' } });
    fireEvent.keyDown(inputHeight, { key: KeyboardKeys.enter });
    fireEvent.blur(inputHeight);
    fireEvent.click(inputWidth);
    fireEvent.change(inputWidth, { target: { value: '10000' } });
    fireEvent.keyDown(inputWidth, { key: KeyboardKeys.enter });
    fireEvent.blur(inputWidth);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1']
        .height.value,
    ).toBe(10000);
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width
        .value,
    ).toBe(10000);
  });

  it('should change width & height when triger ScrubbableInput', () => {
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
        <ColumnResizing />
      </Provider>,
    );

    // find
    const scrubbableInputHeight = getByE2EAttribute(
      container,
      E2EAttribute.scrubbableInput,
      'height',
    );
    const scrubbableInputWidth = getByE2EAttribute(
      container,
      E2EAttribute.scrubbableInput,
      'width',
    );

    // action
    fireEvent.mouseDown(scrubbableInputHeight, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputHeight);
    fireEvent.mouseDown(scrubbableInputWidth, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputWidth);

    // result
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1']
        .height.value,
    ).toBe(50);
    expect(
      store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width
        .value,
    ).toBe(50);
  });
});
