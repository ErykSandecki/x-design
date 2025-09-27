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
import { ZOOM_CONTENT_ID } from 'shared';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys, Unit } from 'types';
import { PopoverItem } from './enums';

// utils
import { createHtmlElement } from 'utils';
import { getByE2EAttribute } from 'test';

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
const zoomContent = createHtmlElement('div', { id: ZOOM_CONTENT_ID });

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
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'width');

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
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe(10000);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe(10000);
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
    const scrubbableInputHeight = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'height');
    const scrubbableInputWidth = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'width');

    // action
    fireEvent.mouseDown(scrubbableInputHeight, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputHeight);
    fireEvent.mouseDown(scrubbableInputWidth, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputWidth);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe(50);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe(50);
  });

  it('should apply fixed value for height & width', () => {
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
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  height: {
                    value: 'auto',
                  },
                  width: {
                    value: 'auto',
                  },
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                [elementAllDataMock.id]: {
                  ...elementDynamicDataMock,
                  height: {
                    value: 'auto',
                  },
                  width: {
                    value: 'auto',
                  },
                },
              },
            },
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.fixed);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe(100);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe(100);
  });

  it('should apply fixed value for height & width when mixed', () => {
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
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  height: {
                    value: 'auto',
                  },
                  width: {
                    value: 'auto',
                  },
                },
                ['test-2']: {
                  ...elementAllDataMock,
                  height: {
                    value: 100,
                  },
                  width: {
                    value: 100,
                  },
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  height: {
                    value: 'auto',
                  },
                  width: {
                    value: 'auto',
                  },
                },
                ['test-2']: {
                  ...elementDynamicDataMock,
                  height: {
                    value: 100,
                  },
                  width: {
                    value: 100,
                  },
                },
              },
            },
            selectedElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'width');

    // find { icons }
    const iconHeight = getByE2EAttribute(inputHeight, E2EAttribute.icon, 'variant');
    const iconWidth = getByE2EAttribute(inputWidth, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverHeight = getByE2EAttribute(inputHeight, E2EAttribute.popover, 'popover');
    const popoverWidth = getByE2EAttribute(inputWidth, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverHeightItem = getByE2EAttribute(popoverHeight, E2EAttribute.popoverItem, PopoverItem.fixed);
    const popoverWidthItem = getByE2EAttribute(popoverWidth, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconHeight);
    fireEvent.click(popoverHeightItem);
    fireEvent.click(iconWidth);
    fireEvent.click(popoverWidthItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe(100);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe(100);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-2'].height.value).toBe(100);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-2'].width.value).toBe(100);
  });

  it('should apply auto value for height & width', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'width');

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
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe('auto');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe('auto');
  });

  it('should apply auto value for height & width when mixed', () => {
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
                [elementAllDataMock.id]: elementAllDataMock,
                ['test-2']: {
                  ...elementAllDataMock,
                  id: 'test-2',
                },
              },
              dynamicData: {
                ...stateMock[PAGE_BUILDER].pages['0'].elements.dynamicData,
                [elementDynamicDataMock.id]: elementDynamicDataMock,
                ['test-2']: {
                  ...elementDynamicDataMock,
                  id: 'test-2',
                },
              },
            },
            selectedElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
          },
        },
      },
    });

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'width');

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
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.value).toBe('auto');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.value).toBe('auto');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-2'].height.value).toBe('auto');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-2'].width.value).toBe('auto');
  });

  it('should apply unit value for height & width', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = render(
      <Provider store={store}>
        <ColumnResizing />
      </Provider>,
    );

    // find { inputs }
    const inputHeight = getByE2EAttribute(container, E2EAttribute.textField, 'height');
    const inputWidth = getByE2EAttribute(container, E2EAttribute.textField, 'width');

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
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].height.unit).toBe(Unit.percentage);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements.allData['test-1'].width.unit).toBe(Unit.percentage);
  });
});
