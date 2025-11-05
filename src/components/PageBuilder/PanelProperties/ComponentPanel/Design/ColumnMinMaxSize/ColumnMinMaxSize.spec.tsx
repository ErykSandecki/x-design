import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnMinSizeInput from './ColumnMinMaxSize';

// mocks
import {
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';
import { ZOOM_CONTENT_ID } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys } from 'types';
import { PopoverItem } from './enums';

// utils
import { createHtmlElement } from 'utils';
import { customRender, getByE2EAttribute } from 'test';

const el1 = createHtmlElement('div', { id: 'test-1' });
const el2 = createHtmlElement('div', { id: 'test-2' });
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
            children: [elementMock.id, 'test-2'],
          },
          [elementMock.id]: {
            ...elementMock,
            height: {
              ...elementMock.height,
              max: {
                ...valueExtendMock,
                value: (elementMock.height.value as number) * 2,
              },
              min: {
                ...valueExtendMock,
                value: (elementMock.height.value as number) * 2,
              },
            },
            width: {
              ...elementMock.width,
              max: {
                ...valueExtendMock,
                value: (elementMock.width.value as number) * 2,
              },
              min: {
                ...valueExtendMock,
                value: (elementMock.width.value as number) * 2,
              },
            },
          },
          ['test-2']: { ...elementMock, id: 'test-2' },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};
const zoomContent = createHtmlElement('div', { id: ZOOM_CONTENT_ID });

describe('ColumnResizing snapshots', () => {
  it('should render ColumnResizing{max}', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render ColumnResizing{min}', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when values are mixed{max}', () => {
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
              ['test-2']: {
                ...elementMock,
                height: {
                  ...elementMock.height,
                  max: {
                    ...valueExtendMock,
                    value: (elementMock.height.value as number) * 4,
                  },
                },
                width: {
                  ...elementMock.width,
                  max: {
                    ...valueExtendMock,
                    value: (elementMock.width.value as number) * 4,
                  },
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
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when values are mixed{min}', () => {
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
              ['test-2']: {
                ...elementMock,
                height: {
                  ...elementMock.height,
                  min: {
                    ...valueExtendMock,
                    value: (elementMock.height.value as number) * 4,
                  },
                },
                width: {
                  ...elementMock.width,
                  min: {
                    ...valueExtendMock,
                    value: (elementMock.width.value as number) * 4,
                  },
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
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnResizing behaviors', () => {
  beforeAll(() => {
    // mock
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(zoomContent);
    zoomContent.appendChild(el1);
    zoomContent.appendChild(el2);
  });

  it('should set max height and width', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'max-width');

    // action
    fireEvent.focus(inputHeight);
    fireEvent.click(inputHeight);
    fireEvent.change(inputHeight, { target: { value: '10000' } });
    fireEvent.keyDown(inputHeight, { key: KeyboardKeys.enter });
    fireEvent.blur(inputHeight);
    fireEvent.focus(inputWidth);
    fireEvent.click(inputWidth);
    fireEvent.change(inputWidth, { target: { value: '10000' } });
    fireEvent.keyDown(inputWidth, { key: KeyboardKeys.enter });
    fireEvent.blur(inputWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 10000,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 10000,
    });
  });

  it('should set min height and width', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'min-width');

    // action
    fireEvent.focus(inputHeight);
    fireEvent.click(inputHeight);
    fireEvent.change(inputHeight, { target: { value: '10000' } });
    fireEvent.keyDown(inputHeight, { key: KeyboardKeys.enter });
    fireEvent.blur(inputHeight);
    fireEvent.focus(inputWidth);
    fireEvent.click(inputWidth);
    fireEvent.change(inputWidth, { target: { value: '10000' } });
    fireEvent.keyDown(inputWidth, { key: KeyboardKeys.enter });
    fireEvent.blur(inputWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 10000,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 10000,
    });
  });

  it('should change max width & height when triger ScrubbableInput', () => {
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find
    const scrubbableInputHeight = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'max-height');
    const scrubbableInputWidth = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'max-width');

    // action
    fireEvent.mouseDown(scrubbableInputHeight, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputHeight);
    fireEvent.mouseDown(scrubbableInputWidth, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 150,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 150,
    });
  });

  it('should change min width & height when triger ScrubbableInput', () => {
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find
    const scrubbableInputHeight = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'min-height');
    const scrubbableInputWidth = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'min-width');

    // action
    fireEvent.mouseDown(scrubbableInputHeight, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputHeight);
    fireEvent.mouseDown(scrubbableInputWidth, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 150,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 150,
    });
  });

  it('should apply current size for max for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'max-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.currentValue);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.currentValue);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 100,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 100,
    });
  });

  it('should apply current size for min for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'min-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.currentValue);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.currentValue);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 100,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 100,
    });
  });

  it('should apply max auto for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'max-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.auto);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.auto);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'auto',
      unit: undefined,
      value: 200,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'auto',
      unit: undefined,
      value: 200,
    });
  });

  it('should apply min auto for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'min-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.auto);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.auto);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'auto',
      unit: undefined,
      value: 200,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'auto',
      unit: undefined,
      value: 200,
    });
  });

  it('should apply max unit for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'max-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.unit);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.unit);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'unit',
      unit: '%',
      value: 200,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'unit',
      unit: '%',
      value: 200,
    });
  });

  it('should apply min unit for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'min-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.unit);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.unit);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'unit',
      unit: '%',
      value: 200,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'unit',
      unit: '%',
      value: 200,
    });
  });

  it('should remove max for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'max-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.removeScore);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.removeScore);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toBe(undefined);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toBe(undefined);
  });

  it('should remove min for height & width', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'min-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.removeScore);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.removeScore);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toBe(undefined);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toBe(undefined);
  });

  it('should detach value max for height & width', () => {
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
              [elementMock.id]: {
                ...elementMock,
                height: {
                  ...valueExtendMock,
                  max: {
                    ...valueExtendMock,
                    mode: 'auto',
                  },
                },
                width: {
                  ...valueExtendMock,
                  max: {
                    ...valueExtendMock,
                    mode: 'auto',
                  },
                },
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
        <ColumnMinSizeInput scoreKey="max" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'max-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'max-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'detached');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'detached');

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(iconWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 0,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.max).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 0,
    });
  });

  it('should detach value min for height & width', () => {
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
              [elementMock.id]: {
                ...elementMock,
                height: {
                  ...valueExtendMock,
                  min: {
                    ...valueExtendMock,
                    mode: 'auto',
                  },
                },
                width: {
                  ...valueExtendMock,
                  min: {
                    ...valueExtendMock,
                    mode: 'auto',
                  },
                },
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
        <ColumnMinSizeInput scoreKey="min" />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'min-height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'min-width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'detached');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'detached');

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(iconWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].height.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 0,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].width.min).toStrictEqual({
      mode: 'fixed',
      unit: undefined,
      value: 0,
    });
  });
});
