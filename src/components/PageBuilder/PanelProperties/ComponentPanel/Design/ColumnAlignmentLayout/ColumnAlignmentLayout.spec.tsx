import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAlignmentLayout from './ColumnAlignmentLayout';

// mocks
import {
  elementMock,
  gapMock,
  layoutMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { AlignmentLayout, E2EAttribute, HTMLContainerId, KeyboardKeys, LayoutType } from 'types';
import { PopoverItem } from './enums';

// utils
import { createHtmlElement } from 'utils';
import { customRender, getByE2EAttribute, sleep } from 'test';

const dropdownContainer = createHtmlElement('div', { id: HTMLContainerId.dropdown });
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
          ['-1']: {
            ...currentPage.elements['-1'],
            children: [elementMock.id, 'test-1'],
          },
          [elementMock.id]: {
            ...elementMock,
            layout: {
              ...layoutMock,
              alignment: AlignmentLayout.topLeft,
              type: LayoutType.horizontal,
            },
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('ColumnAlignmentLayout snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(dropdownContainer);
  });

  it('should render ColumnAlignmentLayout', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is free form', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.none,
                  type: LayoutType.freeForm,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is vertical', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.vertical,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is grid', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when layout types are mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementMock,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when layout alignment are mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topRight,
                  type: LayoutType.horizontal,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when gaps are mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  gap: {
                    ...layoutMock.gap,
                    column: { ...gapMock, value: 0 },
                    row: { ...gapMock, value: 0 },
                  },
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  gap: {
                    ...layoutMock.gap,
                    column: { ...gapMock, value: 10 },
                    row: { ...gapMock, value: 10 },
                  },
                  type: LayoutType.grid,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is included option hover', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.vertical,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const buttonIcon = getByE2EAttribute(container, E2EAttribute.buttonIcon, 'properties');

    // action
    fireEvent.click(buttonIcon);

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select, 'box-sizing');
    const selectOptions = getByE2EAttribute(select, E2EAttribute.selectOptions);
    const selectItem = getByE2EAttribute(selectOptions, E2EAttribute.selectItem, 0);

    // action
    fireEvent.mouseEnter(select);
    fireEvent.mouseEnter(selectItem);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is is enter and leave', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.vertical,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const buttonIcon = getByE2EAttribute(container, E2EAttribute.buttonIcon, 'properties');

    // action
    fireEvent.click(buttonIcon);

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select, 'box-sizing');

    // action
    fireEvent.mouseEnter(select);
    fireEvent.mouseLeave(select);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnAlignmentLayout behaviors', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(dropdownContainer);
  });

  it('should change alignment', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const aligmentArea = getByE2EAttribute(container, E2EAttribute.alignmentArea, 'alignment-flow');
    const alignmentOption = getByE2EAttribute(aligmentArea, E2EAttribute.alignmentAreaOption, AlignmentLayout.center);

    // action
    fireEvent.click(alignmentOption);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.alignment).toBe(AlignmentLayout.center);
  });

  it('should change alignment when mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.horizontal,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topRight,
                  type: LayoutType.horizontal,
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const aligmentArea = getByE2EAttribute(container, E2EAttribute.alignmentArea, 'alignment-flow');
    const alignmentOption = getByE2EAttribute(aligmentArea, E2EAttribute.alignmentAreaOption, AlignmentLayout.center);

    // action
    fireEvent.click(alignmentOption);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.alignment).toBe(AlignmentLayout.center);
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.alignment).toBe(AlignmentLayout.center);
  });

  it('should change column & row gap when enter value on input', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const inputColumnGap = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'column');
    const inputRowGap = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'row');

    // action
    fireEvent.click(inputColumnGap);
    fireEvent.change(inputColumnGap, { target: { value: '100' } });
    fireEvent.keyDown(inputColumnGap, { key: KeyboardKeys.enter });
    fireEvent.blur(inputColumnGap);
    fireEvent.click(inputRowGap);
    fireEvent.change(inputRowGap, { target: { value: '100' } });
    fireEvent.keyDown(inputRowGap, { key: KeyboardKeys.enter });
    fireEvent.blur(inputRowGap);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.gap).toStrictEqual({
      column: { mode: 'fixed', value: 100 },
      row: { mode: 'fixed', value: 100 },
    });
  });

  it('should change column & row gap when triger ScrubbableInput', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // mock
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const scrubbableInputColumnGap = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'column');
    const scrubbableInputRowGap = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'row');

    // action
    fireEvent.mouseDown(scrubbableInputColumnGap, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputColumnGap);
    fireEvent.mouseDown(scrubbableInputRowGap, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputRowGap);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.gap).toStrictEqual({
      column: { mode: 'fixed', value: 100 },
      row: { mode: 'fixed', value: 100 },
    });
  });

  it('should change column & row gap when enter value on input when mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  gap: {
                    ...layoutMock.gap,
                    column: {
                      ...gapMock,
                      value: 0,
                    },
                    row: {
                      ...gapMock,
                      value: 0,
                    },
                  },
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  gap: {
                    ...layoutMock.gap,
                    column: {
                      ...gapMock,
                      value: 10,
                    },
                    row: {
                      ...gapMock,
                      value: 10,
                    },
                  },
                  type: LayoutType.grid,
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const inputColumnGap = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'column');
    const inputRowGap = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'row');

    // action
    fireEvent.click(inputColumnGap);
    fireEvent.change(inputColumnGap, { target: { value: '100' } });
    fireEvent.keyDown(inputColumnGap, { key: KeyboardKeys.enter });
    fireEvent.blur(inputColumnGap);
    fireEvent.click(inputRowGap);
    fireEvent.change(inputRowGap, { target: { value: '100' } });
    fireEvent.keyDown(inputRowGap, { key: KeyboardKeys.enter });
    fireEvent.blur(inputRowGap);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.gap).toStrictEqual({
      column: { mode: 'fixed', value: 100 },
      row: { mode: 'fixed', value: 100 },
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.gap).toStrictEqual({
      column: { mode: 'fixed', value: 100 },
      row: { mode: 'fixed', value: 100 },
    });
  });

  it('should apply fixed value for column & row', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const inputColumnGap = getByE2EAttribute(container, E2EAttribute.textField, 'column');
    const inputRowGap = getByE2EAttribute(container, E2EAttribute.textField, 'row');

    // find { icons }
    const iconColumnGap = getByE2EAttribute(inputColumnGap, E2EAttribute.icon, 'variant');
    const iconRowGap = getByE2EAttribute(inputRowGap, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverColumnGap = getByE2EAttribute(inputColumnGap, E2EAttribute.popover, 'popover');
    const popoverRowGap = getByE2EAttribute(inputRowGap, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverColumnGapItem = getByE2EAttribute(popoverColumnGap, E2EAttribute.popoverItem, PopoverItem.fixed);
    const popoverRowGapItem = getByE2EAttribute(popoverRowGap, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconColumnGap);
    fireEvent.click(popoverColumnGapItem);
    fireEvent.click(iconRowGap);
    fireEvent.click(popoverRowGapItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.gap).toStrictEqual({
      column: { ...valueExtendMock, value: 0 },
      row: { ...valueExtendMock, value: 0 },
    });
  });

  it('should change box sizing', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const buttonIcon = getByE2EAttribute(container, E2EAttribute.buttonIcon, 'properties');

    // action
    fireEvent.click(buttonIcon);

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select, 'box-sizing');
    const selectOptions = getByE2EAttribute(select, E2EAttribute.selectOptions);
    const selectItem = getByE2EAttribute(selectOptions, E2EAttribute.selectItem, 0);

    // action
    fireEvent.click(select);
    fireEvent.click(selectItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.boxSizing).toBe('included');
  });

  it('should change box sizing when mixed', () => {
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
              ['test-1']: {
                ...elementMock,
                layout: {
                  ...elementMock.layout,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
                },
              },
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                layout: {
                  ...elementMock.layout,
                  alignment: AlignmentLayout.topLeft,
                  boxSizing: 'included',
                  type: LayoutType.grid,
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
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const buttonIcon = getByE2EAttribute(container, E2EAttribute.buttonIcon, 'properties');

    // action
    fireEvent.click(buttonIcon);

    // find
    const select = getByE2EAttribute(container, E2EAttribute.select, 'box-sizing');
    const selectOptions = getByE2EAttribute(select, E2EAttribute.selectOptions);
    const selectItem = getByE2EAttribute(selectOptions, E2EAttribute.selectItem, 0);

    // action
    fireEvent.click(select);
    fireEvent.click(selectItem);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.boxSizing).toBe('included');
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.boxSizing).toBe('included');
  });

  it('should change columns & rows when enter value on inputs', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const area = getByE2EAttribute(container, E2EAttribute.gridArea, 'grid-flow');

    // action
    fireEvent.click(area);

    // find
    const inputColumns = getByE2EAttribute(area, E2EAttribute.textFieldInput, 'columns');
    const inputRows = getByE2EAttribute(area, E2EAttribute.textFieldInput, 'rows');

    // action
    fireEvent.click(inputColumns);
    fireEvent.change(inputColumns, { target: { value: '100' } });
    fireEvent.keyDown(inputColumns, { key: KeyboardKeys.enter });
    fireEvent.blur(inputColumns);
    fireEvent.click(inputRows);
    fireEvent.change(inputRows, { target: { value: '100' } });
    fireEvent.keyDown(inputRows, { key: KeyboardKeys.enter });
    fireEvent.blur(inputRows);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.grid).toStrictEqual({
      columns: 100,
      rows: 100,
    });
  });

  it('should change columns & rows when triger ScrubbableInput', async () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
                },
              },
            },
            selectedElements: [...stateMock[PAGE_BUILDER].pages['0'].selectedElements],
          },
        },
      },
    });

    // mock
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const area = getByE2EAttribute(container, E2EAttribute.gridArea, 'grid-flow');

    // action
    fireEvent.click(area);

    // find
    const scrubbableInputColumns = getByE2EAttribute(area, E2EAttribute.scrubbableInput, 'columns');
    const scrubbableInputRows = getByE2EAttribute(area, E2EAttribute.scrubbableInput, 'rows');

    // action { columns }
    fireEvent.mouseDown(scrubbableInputColumns, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);

    // wait { it's a problem with mouse up & state is not refreshed }
    await sleep(100);

    // action
    fireEvent.mouseUp(scrubbableInputColumns);

    // action { rows }
    fireEvent.mouseDown(scrubbableInputRows, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);

    // wait { it's a problem with mouse up & state is not refreshed }
    await sleep(100);

    // action
    fireEvent.mouseUp(scrubbableInputRows);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.grid).toStrictEqual({
      columns: 100,
      rows: 100,
    });
  });

  it('should change columns & rows when click some cell', () => {
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
              ['test-1']: {
                ...elementMock,
                id: 'test-1',
                layout: {
                  ...layoutMock,
                  alignment: AlignmentLayout.topLeft,
                  type: LayoutType.grid,
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
        <ColumnAlignmentLayout width={0} />
      </Provider>,
    );

    // find
    const area = getByE2EAttribute(container, E2EAttribute.gridArea, 'grid-flow');

    // action
    fireEvent.click(area);

    // find
    const gridCellsInput = getByE2EAttribute(area, E2EAttribute.gridCellsInput);
    const gridCellInput = getByE2EAttribute(gridCellsInput, E2EAttribute.gridCellInput, 96);

    // action
    fireEvent.click(gridCellInput);

    // result
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-1'].layout.grid).toStrictEqual({
      columns: 12,
      rows: 8,
    });
  });
});
