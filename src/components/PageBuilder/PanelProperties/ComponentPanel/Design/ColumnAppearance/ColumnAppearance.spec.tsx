import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAppearance from './ColumnAppearance';

// mocks
import {
  childrenMock,
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
  sizeMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys } from 'types';
import { PopoverItem } from './enums';

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
          [elementMock.id]: elementMock,
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

describe('ColumnAppearance snapshots', () => {
  it('should render ColumnAppearance', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
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
                id: 'test-2',
                opacity: {
                  ...sizeMock,
                  value: 0,
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
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnAppearance behaviors', () => {
  it('should change opacity when enter value on input', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find
    const inputOpacity = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'opacity');

    // action
    fireEvent.click(inputOpacity);
    fireEvent.change(inputOpacity, { target: { value: '50' } });
    fireEvent.keyDown(inputOpacity, { key: KeyboardKeys.enter });
    fireEvent.blur(inputOpacity);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].opacity.value).toBe(50);
  });

  it('should change opacity when triger ScrubbableInput', () => {
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
        <ColumnAppearance />
      </Provider>,
    );

    // find
    const scrubbableInput = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'opacity');

    // action
    fireEvent.mouseDown(scrubbableInput, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInput);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].opacity.value).toBe(0);
  });

  it('should apply fixed value for opacity', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find { inputs }
    const inputOpacity = getByE2EAttribute(container, E2EAttribute.textField, 'opacity');

    // find { icons }
    const iconOpacity = getByE2EAttribute(inputOpacity, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverOpacity = getByE2EAttribute(inputOpacity, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverOpacityItem = getByE2EAttribute(popoverOpacity, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconOpacity);
    fireEvent.click(popoverOpacityItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].opacity.mode).toBe('fixed');
  });
});
