import { cloneDeep } from 'lodash';

// mocks
import {
  elementAllDataMock,
  createFrameMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../actionsType';

// store
import pageBuilder from '../reducer';
import {
  addElement,
  selectElement,
  unselectElement,
  selectElements,
  setAreCoordinates,
  setElementCoordinates,
  setElementsCoordinates,
  updateEventsStatus,
  setElementSizes,
  rotateElement,
  changeParent,
  updatePrevState,
  changeBackground,
} from '../actions';

// types
import { Anchor } from '../enums';
import { TAction, TBackground } from 'types';
import { TPageBuilderState } from '../types';

describe('PageBuilderReducer', () => {
  const reducer = (action: TAction, initialState = {}): TPageBuilderState =>
    pageBuilder(initialState as TPageBuilderState, action);

  it('should return default state', () => {
    // before
    const state = pageBuilder(
      { ...pageBuilderStateMock[PAGE_BUILDER] },
      { type: '' },
    );

    // result
    expect(state).toEqual(pageBuilderStateMock[PAGE_BUILDER]);
  });

  it('should handle ADD_ELEMENT', () => {
    // before
    const state = reducer(addElement(createFrameMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [createFrameMock.id],
          },
          [createFrameMock.id]: createFrameMock,
        },
        dynamicData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1'],
          },
          [createFrameMock.id]: {
            background: createFrameMock.background,
            coordinates: createFrameMock.coordinates,
            height: createFrameMock.height,
            id: createFrameMock.id,
            position: createFrameMock.position,
            rotate: createFrameMock.rotate,
            width: createFrameMock.width,
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [createFrameMock.id],
          },
          [createFrameMock.id]: {
            children: createFrameMock.children,
            id: createFrameMock.id,
            parentId: createFrameMock.parentId,
            position: createFrameMock.position,
            type: createFrameMock.type,
          },
        },
      },
    });
  });

  it('should handle CHANGE_BACKGROUND', () => {
    // mock
    const background: TBackground = {
      alpha: '100',
      format: 'hex',
      value: '#ffffff',
      visible: true,
    };

    // before
    const state = reducer(changeBackground(background, '-1'), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData,
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            background: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1']
                .background,
              ...background,
            },
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1'],
            background: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData['-1']
                .background,
              ...background,
            },
          },
        },
        staticData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData,
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
          },
        },
      },
    });
  });

  it('should handle CHANGE_PARENT', () => {
    // mock
    const draggableElements = ['2'];
    const possibleIndexPosition = null;
    const possibleParent = '-1';
    const el1 = document.createElement('div');
    const el2 = document.createElement('div');

    // before
    el1.setAttribute('id', selectedElementMock.id);
    el1.style.height = '100px';
    el1.style.width = '100px';
    el2.setAttribute('id', '2');
    el2.style.height = '100px';
    el2.style.width = '100px';
    document.body.appendChild(el1);
    document.body.appendChild(el2);

    // before
    const state = reducer(
      changeParent(draggableElements, possibleIndexPosition, possibleParent),
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements,
          allData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
              children: [selectedElementMock.id],
            },
            [elementAllDataMock.id]: {
              ...elementAllDataMock,
              children: ['2'],
            },
            ['2']: {
              ...elementAllDataMock,
              id: '2',
              parentId: selectedElementMock.id,
            },
          },
          dynamicData: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
            [elementDynamicDataMock.id]: {
              ...elementDynamicDataMock,
            },
            ['2']: {
              ...elementDynamicDataMock,
              id: '2',
            },
          },
          staticData: {
            ['-1']: {
              ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
              children: [selectedElementMock.id],
            },

            [elementStaticDataMock.id]: {
              ...elementStaticDataMock,
              children: ['2'],
            },
            ['2']: {
              ...elementStaticDataMock,
              id: '2',
              parentId: selectedElementMock.id,
            },
          },
        },
      },
    );

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.allData['-1'],
            children: [selectedElementMock.id, '2'],
          },
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
          },
          ['2']: {
            ...elementAllDataMock,
            id: '2',
            parentId: '-1',
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
          ['2']: {
            ...elementDynamicDataMock,
            id: '2',
          },
        },
        staticData: {
          ['-1']: {
            ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData['-1'],
            children: [selectedElementMock.id, '2'],
          },
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
          },
          ['2']: {
            ...elementStaticDataMock,
            id: '2',
            parentId: '-1',
          },
        },
      },
    });
  });

  it('should handle ROTATE_ELEMENT', () => {
    // mock
    const rotate = 180;

    // before
    const state = reducer(rotateElement(selectedElementMock.id, rotate), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData,
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
          },
        },
        staticData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData,
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
          },
        },
      },
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.allData,
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            rotate,
          },
        },
        dynamicData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.dynamicData,
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            rotate,
          },
        },
        staticData: {
          ...pageBuilderStateMock[PAGE_BUILDER].elements.staticData,
          [elementStaticDataMock.id]: {
            ...elementStaticDataMock,
          },
        },
      },
    });
  });

  it('should handle SELECT_ELEMENT', () => {
    // before
    const state = reducer(selectElement(selectedElementMock), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: [selectedElementMock],
    });
  });

  it('should handle SELECT_ELEMENTS', () => {
    // before
    const state = reducer(selectElements([selectedElementMock]), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: [selectedElementMock],
    });
  });

  it('should handle SET_AREA_COORDINATES', () => {
    // mock
    const areaCoordinates = { x: 100, y: 100, z: 2 };

    // before
    const state = reducer(setAreCoordinates(areaCoordinates), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      areaCoordinates,
    });
  });

  it('should handle SET_ELEMENT_COORDINATES', () => {
    // mock
    const coordinates = { x: 100, y: 100 };

    // before
    const state = reducer(
      setElementCoordinates(coordinates, elementAllDataMock.id),
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: {
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
      },
    );

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        ...pageBuilderStateMock[PAGE_BUILDER].elements,
        allData: {
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            coordinates,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            coordinates,
          },
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
    });
  });

  it('should handle SET_ELEMENT_SIZES', () => {
    // mock
    const baseCoordinates = { x1: 0, x2: 100, y1: 0, y2: 100 };
    const mouseCoordinates = { x: 200, y: 100 };

    // before
    const state = reducer(
      setElementSizes(
        baseCoordinates,
        100,
        selectedElementMock.id,
        mouseCoordinates,
        100,
      ),
      {
        ...pageBuilderStateMock[PAGE_BUILDER],
        elements: {
          allData: {
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
          staticData: {
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
        events: {
          ...pageBuilderStateMock[PAGE_BUILDER].events,
          selectedAnchor: Anchor.east,
        },
        selectedElements: {
          [selectedElementMock.id]: selectedElementMock,
        },
      },
    );

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            coordinates: { x: 0, y: 0 },
            height: 100,
            width: 300,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            coordinates: { x: 0, y: 0 },
            height: 100,
            width: 300,
          },
        },
        staticData: {
          [elementStaticDataMock.id]: elementStaticDataMock,
        },
      },
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        selectedAnchor: Anchor.east,
      },
      selectedElements: {
        [selectedElementMock.id]: selectedElementMock,
      },
    });
  });

  it('should handle SET_ELEMENTS_COORDINATES', () => {
    // mock
    const coordinates = { x: 100, y: 100 };
    const mockState = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: { [elementAllDataMock.id]: elementAllDataMock },
        dynamicData: { [elementDynamicDataMock.id]: elementDynamicDataMock },
        staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
      },
      selectedElements: [selectedElementMock],
    };
    const prevState = cloneDeep(mockState);

    // before
    const state = reducer(setElementsCoordinates(coordinates), {
      ...mockState,
      prevState,
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      elements: {
        allData: {
          [elementAllDataMock.id]: {
            ...elementAllDataMock,
            coordinates,
          },
        },
        dynamicData: {
          [elementDynamicDataMock.id]: {
            ...elementDynamicDataMock,
            coordinates,
          },
        },
        staticData: { [elementStaticDataMock.id]: elementStaticDataMock },
      },
      prevState,
      selectedElements: [
        {
          ...selectedElementMock,
          coordinates: {
            x1: coordinates.x,
            x2: coordinates.x,
            y1: coordinates.y,
            y2: coordinates.y,
          },
        },
      ],
    });
  });

  it('should handle UPDATE_EVENTS_STATUS', () => {
    // before
    const state = reducer(updateEventsStatus({ isMultipleMoving: true }), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      events: {
        ...pageBuilderStateMock[PAGE_BUILDER].events,
        isMultipleMoving: true,
      },
    });
  });

  it('should handle UPDATE_PREV_STATE', () => {
    // before
    const state = reducer(updatePrevState(), {
      ...pageBuilderStateMock[PAGE_BUILDER],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      prevState: pageBuilderStateMock[PAGE_BUILDER],
    });
  });

  it('should handle UNSELECT_ELEMENT', () => {
    // mock
    const id = selectedElementMock.id;

    // before
    const state = reducer(unselectElement(id), {
      ...pageBuilderStateMock[PAGE_BUILDER],
      selectedElements: [selectedElementMock],
    });

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
    });
  });
});
