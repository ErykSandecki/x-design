import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnRotation from './ColumnRotation';

// mocks
import {
  childrenMock,
  elementMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys, LayoutType } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

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
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('ColumnRotation snapshots', () => {
  it('should render ColumnRotation', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
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
              ['-1']: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements['-1'],
                children: [childrenMock, { ...childrenMock, id: 'test-2' }],
              },
              ['test-2']: {
                ...elementMock,
                angle: 100,
                id: 'test-2',
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
    const { asFragment } = customRender(
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const inputX = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'angle');

    // action
    fireEvent.click(inputX);
    fireEvent.change(inputX, { target: { value: '100' } });
    fireEvent.keyDown(inputX, { key: KeyboardKeys.enter });
    fireEvent.blur(inputX);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].angle).toBe(100);
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const scrubbableInput = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'angle');

    // action
    fireEvent.mouseDown(scrubbableInput, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInput);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].angle).toBe(-100);
  });

  it('should change angle another 90 degress', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const verticalButtonGroup = getByE2EAttribute(container, E2EAttribute.buttonGroup, 'layout-position');

    // action
    fireEvent.click(getByE2EAttribute(verticalButtonGroup, E2EAttribute.buttonGroupInput, 'toggle-rotate'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].angle).toBe(90);
  });

  it('should flip x', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        pages: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages,
          ['0']: {
            ...currentPage,
            elements: {
              ...currentPage.elements,
              ['-1']: {
                ...currentPage.elements['-1'],
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const verticalButtonGroup = getByE2EAttribute(container, E2EAttribute.buttonGroup, 'layout-position');

    // action
    fireEvent.click(getByE2EAttribute(verticalButtonGroup, E2EAttribute.buttonGroupInput, 'flip-horizontal'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].children).toStrictEqual([
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-2' },
    ]);
  });

  it('should flip y', () => {
    // mock
    const store = configureStore({
      ...stateMock,
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
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
                children: [
                  { ...childrenMock, id: 'test-2' },
                  { ...childrenMock, id: 'test-3' },
                ],
                layout: {
                  ...layoutMock,
                  type: LayoutType.vertical,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                parentId: 'test-1',
              },
              ['test-3']: {
                ...elementMock,
                id: 'test-3',
                parentId: 'test-1',
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnRotation />
      </Provider>,
    );

    // find
    const verticalButtonGroup = getByE2EAttribute(container, E2EAttribute.buttonGroup, 'layout-position');

    // action
    fireEvent.click(getByE2EAttribute(verticalButtonGroup, E2EAttribute.buttonGroupInput, 'flip-vertical'));

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].children).toStrictEqual([
      { ...childrenMock, id: 'test-3' },
      { ...childrenMock, id: 'test-2' },
    ]);
  });
});
