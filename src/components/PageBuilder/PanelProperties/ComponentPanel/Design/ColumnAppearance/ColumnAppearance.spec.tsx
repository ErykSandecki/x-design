import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAppearance from './ColumnAppearance';

// mocks
import {
  childrenMock,
  elementMock,
  insetsMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
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
                borderRadius: {
                  ...insetsMock,
                  b: {
                    mode: 'auto',
                    value: 0,
                  },
                },
                id: 'test-2',
                opacity: {
                  ...valueExtendMock,
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

  it('should change border radius when enter value on input', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find
    const inputBorderRadius = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'border-radius');

    // action
    fireEvent.click(inputBorderRadius);
    fireEvent.change(inputBorderRadius, { target: { value: '50' } });
    fireEvent.keyDown(inputBorderRadius, { key: KeyboardKeys.enter });
    fireEvent.blur(inputBorderRadius);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'fixed', value: 50 },
      l: { mode: 'fixed', value: 50 },
      r: { mode: 'fixed', value: 50 },
      t: { mode: 'fixed', value: 50 },
    });
  });

  it('should change border radius when values insets values are mixed', () => {
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
              [elementMock.id]: {
                ...elementMock,
                borderRadius: {
                  ...insetsMock,
                  l: {
                    mode: 'fixed',
                    value: 100,
                  },
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find
    const inputBorderRadius = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'border-radius');

    // action
    fireEvent.click(inputBorderRadius);
    fireEvent.change(inputBorderRadius, { target: { value: '50' } });
    fireEvent.keyDown(inputBorderRadius, { key: KeyboardKeys.enter });
    fireEvent.blur(inputBorderRadius);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'fixed', value: 50 },
      l: { mode: 'fixed', value: 50 },
      r: { mode: 'fixed', value: 50 },
      t: { mode: 'fixed', value: 50 },
    });
  });

  it('should detached when modes border radius are mixed', () => {
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
              [elementMock.id]: {
                ...elementMock,
                borderRadius: {
                  ...insetsMock,
                  l: {
                    mode: 'variable',
                    value: 0,
                  },
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find { inputs }
    const inputBorderRadius = getByE2EAttribute(container, E2EAttribute.textField, 'border-radius');

    // find { icons }
    const iconBorderRadius = getByE2EAttribute(inputBorderRadius, E2EAttribute.icon, 'detached');

    // action
    fireEvent.click(iconBorderRadius);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'fixed', unit: undefined, value: 0 },
      l: { mode: 'fixed', unit: undefined, value: 0 },
      r: { mode: 'fixed', unit: undefined, value: 0 },
      t: { mode: 'fixed', unit: undefined, value: 0 },
    });
  });

  it('should change border radius when triger ScrubbableInput', () => {
    // mock
    const store = configureStore(stateMock);
    const mouseMoveEvent = new MouseEvent('mousemove', {
      bubbles: true,
      cancelable: true,
      shiftKey: false,
      view: window,
    });
    Object.defineProperty(mouseMoveEvent, 'movementX', { value: 200 });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find
    const scrubbableInput = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'border-radius');

    // action
    fireEvent.mouseDown(scrubbableInput, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInput);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'fixed', value: 100 },
      l: { mode: 'fixed', value: 100 },
      r: { mode: 'fixed', value: 100 },
      t: { mode: 'fixed', value: 100 },
    });
  });

  it('should apply fixed value for border radius', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find { inputs }
    const inputBorderRadius = getByE2EAttribute(container, E2EAttribute.textField, 'border-radius');

    // find { icons }
    const iconBorderRadius = getByE2EAttribute(inputBorderRadius, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverBorderRadius = getByE2EAttribute(inputBorderRadius, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverBorderRadiusItem = getByE2EAttribute(popoverBorderRadius, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconBorderRadius);
    fireEvent.click(popoverBorderRadiusItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'fixed', unit: undefined, value: 0 },
      l: { mode: 'fixed', unit: undefined, value: 0 },
      r: { mode: 'fixed', unit: undefined, value: 0 },
      t: { mode: 'fixed', unit: undefined, value: 0 },
    });
  });

  it('should apply unit value for border radius', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAppearance />
      </Provider>,
    );

    // find { inputs }
    const inputBorderRadius = getByE2EAttribute(container, E2EAttribute.textField, 'border-radius');

    // find { icons }
    const iconBorderRadius = getByE2EAttribute(inputBorderRadius, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverBorderRadius = getByE2EAttribute(inputBorderRadius, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverBorderRadiusItem = getByE2EAttribute(popoverBorderRadius, E2EAttribute.popoverItem, PopoverItem.unit);

    // action
    fireEvent.click(iconBorderRadius);
    fireEvent.click(popoverBorderRadiusItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].borderRadius).toStrictEqual({
      b: { mode: 'unit', unit: '%', value: 0 },
      l: { mode: 'unit', unit: '%', value: 0 },
      r: { mode: 'unit', unit: '%', value: 0 },
      t: { mode: 'unit', unit: '%', value: 0 },
    });
  });
});
