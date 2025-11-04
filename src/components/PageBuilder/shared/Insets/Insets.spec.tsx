import { fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';

// components
import Insets from './Insets';

// mocks
import {
  elementMock,
  insetsMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';
import { translationNameSpace as paddingTranslationNameSpace } from '../../PanelProperties/ComponentPanel/Design/ColumnPadding/constants';

// store
import { configureStore } from 'store/store';

// types
import { E2EAttribute, KeyboardKeys } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';
import { PopoverItem } from './enums';

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
            children: [elementMock.id],
          },
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('Insets snapshots', () => {
  it('should render Insets', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when mose is individual', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render back to merged mode', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { asFragment, container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Insets behaviors', () => {
  it('should change padding lr & tb', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const inputLR = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-lr');
    const inputTB = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-tb');

    // action
    fireEvent.click(inputLR);
    fireEvent.change(inputLR, { target: { value: '100' } });
    fireEvent.keyDown(inputLR, { key: KeyboardKeys.enter });
    fireEvent.blur(inputLR);
    fireEvent.click(inputTB);
    fireEvent.change(inputTB, { target: { value: '100' } });
    fireEvent.keyDown(inputTB, { key: KeyboardKeys.enter });
    fireEvent.blur(inputTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding lr & tb when mixed', () => {
    // mock
    const store = configureStore({
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
                children: [elementMock.id, { ...elementMock, id: 'test-2' }],
              },
              [elementMock.id]: elementMock,
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                padding: {
                  b: 1,
                  l: 1,
                  r: 1,
                  t: 1,
                },
              },
            },
            selectedElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
          },
        },
      },
    });

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const inputLR = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-lr');
    const inputTB = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-tb');

    // action
    fireEvent.click(inputLR);
    fireEvent.change(inputLR, { target: { value: '100' } });
    fireEvent.keyDown(inputLR, { key: KeyboardKeys.enter });
    fireEvent.blur(inputLR);
    fireEvent.click(inputTB);
    fireEvent.change(inputTB, { target: { value: '100' } });
    fireEvent.keyDown(inputTB, { key: KeyboardKeys.enter });
    fireEvent.blur(inputTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-2'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding lr & tb when values are not merged', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const inputLR = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-lr');
    const inputTB = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-tb');

    // action
    fireEvent.click(inputLR);
    fireEvent.change(inputLR, { target: { value: '100, 50' } });
    fireEvent.keyDown(inputLR, { key: KeyboardKeys.enter });
    fireEvent.blur(inputLR);
    fireEvent.click(inputTB);
    fireEvent.change(inputTB, { target: { value: '100, 50' } });
    fireEvent.keyDown(inputTB, { key: KeyboardKeys.enter });
    fireEvent.blur(inputTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 50 },
      l: { value: 100 },
      r: { value: 50 },
      t: { value: 100 },
    });
  });

  it('should change padding lr & tb when triger ScrubbableInput', () => {
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
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const scrubbableInputLR = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-lr');
    const scrubbableInputTB = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-tb');

    // action
    fireEvent.mouseDown(scrubbableInputLR, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputLR);
    fireEvent.mouseDown(scrubbableInputTB, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding lr & tb when triger ScrubbableInput & values are not merged', () => {
    // mock
    const store = configureStore({
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
                children: [elementMock.id],
              },
              [elementMock.id]: {
                ...elementMock,
                padding: {
                  ...insetsMock,
                  b: { value: 50 },
                  r: { value: 50 },
                },
              },
            },
            selectedElements: [selectedElementMock],
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
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const scrubbableInputLR = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-lr');
    const scrubbableInputTB = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-tb');

    // action
    fireEvent.mouseDown(scrubbableInputLR, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputLR);
    fireEvent.mouseDown(scrubbableInputTB, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 150 },
      l: { value: 100 },
      r: { value: 150 },
      t: { value: 100 },
    });
  });

  it('should change padding b,l,r,t', () => {
    // mock
    const store = configureStore(stateMock);
    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));

    // find
    const inputB = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-b');
    const inputL = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-l');
    const inputR = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-r');
    const inputT = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-t');

    // action
    fireEvent.click(inputB);
    fireEvent.change(inputB, { target: { value: '100' } });
    fireEvent.keyDown(inputB, { key: KeyboardKeys.enter });
    fireEvent.blur(inputB);
    fireEvent.click(inputL);
    fireEvent.change(inputL, { target: { value: '100' } });
    fireEvent.keyDown(inputL, { key: KeyboardKeys.enter });
    fireEvent.blur(inputL);
    fireEvent.click(inputR);
    fireEvent.change(inputR, { target: { value: '100' } });
    fireEvent.keyDown(inputR, { key: KeyboardKeys.enter });
    fireEvent.blur(inputR);
    fireEvent.click(inputT);
    fireEvent.change(inputT, { target: { value: '100' } });
    fireEvent.keyDown(inputT, { key: KeyboardKeys.enter });
    fireEvent.blur(inputT);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding b,l,r,t when mixed', () => {
    // mock
    const store = configureStore({
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
                children: [elementMock.id, { ...elementMock, id: 'test-2' }],
              },
              [elementMock.id]: elementMock,
              ['test-2']: {
                ...elementMock,
                id: 'test-2',
                padding: {
                  b: 1,
                  l: 1,
                  r: 1,
                  t: 1,
                },
              },
            },
            selectedElements: [selectedElementMock, { ...selectedElementMock, id: 'test-2' }],
          },
        },
      },
    });
    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));

    // find
    const inputB = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-b');
    const inputL = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-l');
    const inputR = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-r');
    const inputT = getByE2EAttribute(container, E2EAttribute.textFieldInput, 'padding-t');

    // action
    fireEvent.click(inputB);
    fireEvent.change(inputB, { target: { value: '100' } });
    fireEvent.keyDown(inputB, { key: KeyboardKeys.enter });
    fireEvent.blur(inputB);
    fireEvent.click(inputL);
    fireEvent.change(inputL, { target: { value: '100' } });
    fireEvent.keyDown(inputL, { key: KeyboardKeys.enter });
    fireEvent.blur(inputL);
    fireEvent.click(inputR);
    fireEvent.change(inputR, { target: { value: '100' } });
    fireEvent.keyDown(inputR, { key: KeyboardKeys.enter });
    fireEvent.blur(inputR);
    fireEvent.click(inputT);
    fireEvent.change(inputT, { target: { value: '100' } });
    fireEvent.keyDown(inputT, { key: KeyboardKeys.enter });
    fireEvent.blur(inputT);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-2'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding b,l,r,t when triger ScrubbableInput', () => {
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
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'insets-mode'));

    // find
    const scrubbableInputB = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-b');
    const scrubbableInputL = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-l');
    const scrubbableInputR = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-r');
    const scrubbableInputT = getByE2EAttribute(container, E2EAttribute.scrubbableInput, 'padding-t');

    // action
    fireEvent.mouseDown(scrubbableInputB, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputB);
    fireEvent.mouseDown(scrubbableInputL, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputL);
    fireEvent.mouseDown(scrubbableInputR, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputR);
    fireEvent.mouseDown(scrubbableInputT, { clientX: 0, clientY: 0 });
    window.dispatchEvent(mouseMoveEvent);
    fireEvent.mouseUp(scrubbableInputT);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { value: 100 },
      l: { value: 100 },
      r: { value: 100 },
      t: { value: 100 },
    });
  });

  it('should change padding lr & tb', () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { container } = customRender(
      <Provider store={store}>
        <Insets insetsName="padding" translationNameSpace={paddingTranslationNameSpace} />
      </Provider>,
    );

    // find
    const inputLR = getByE2EAttribute(container, E2EAttribute.textField, 'padding-lr');
    const inputTB = getByE2EAttribute(container, E2EAttribute.textField, 'padding-tb');

    // find { icons }
    const iconLR = getByE2EAttribute(inputLR, E2EAttribute.icon, 'variant');
    const iconTB = getByE2EAttribute(inputTB, E2EAttribute.icon, 'variant');

    // find { popovers }
    const popoverLR = getByE2EAttribute(inputLR, E2EAttribute.popover, 'popover');
    const popoverTB = getByE2EAttribute(inputTB, E2EAttribute.popover, 'popover');

    // find { popover items }
    const popoverGapItemLR = getByE2EAttribute(popoverLR, E2EAttribute.popoverItem, PopoverItem.fixed);
    const popoverGapItemTB = getByE2EAttribute(popoverTB, E2EAttribute.popoverItem, PopoverItem.fixed);

    // action
    fireEvent.click(iconLR);
    fireEvent.click(popoverGapItemLR);
    fireEvent.click(iconTB);
    fireEvent.click(popoverGapItemTB);

    // result
    expect(store.getState()[PAGE_BUILDER].pages[0].elements['test-1'].padding).toStrictEqual({
      b: { ...valueExtendMock, value: 0 },
      l: { ...valueExtendMock, value: 0 },
      r: { ...valueExtendMock, value: 0 },
      t: { ...valueExtendMock, value: 0 },
    });
  });
});
