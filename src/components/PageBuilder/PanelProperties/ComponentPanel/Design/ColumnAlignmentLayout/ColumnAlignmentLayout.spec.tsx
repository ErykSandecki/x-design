import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import ColumnAlignmentLayout from './ColumnAlignmentLayout';

// mocks
import { elementMock, layoutMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { AlignmentLayout, E2EAttribute, KeyboardKeys, LayoutType } from 'types';

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
  it('should render ColumnAlignmentLayout', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
                    column: 0,
                    row: 0,
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
                    column: 10,
                    row: 10,
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
        <ColumnAlignmentLayout />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColumnAlignmentLayout behaviors', () => {
  it('should change alignment', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
        <ColumnAlignmentLayout />
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
      column: 100,
      row: 100,
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
        <ColumnAlignmentLayout />
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
      column: 100,
      row: 100,
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
                    column: 0,
                    row: 0,
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
                    column: 10,
                    row: 10,
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
        <ColumnAlignmentLayout />
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
      column: 100,
      row: 100,
    });
    expect(store.getState()[PAGE_BUILDER].pages['0'].elements['test-2'].layout.gap).toStrictEqual({
      column: 100,
      row: 100,
    });
  });
});
