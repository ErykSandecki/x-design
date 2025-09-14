// mocks
import {
  createFrameMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleAddElement } from '../handleAddElement';

describe('handleAddElement', () => {
  it(`should return data with added element`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

    // before
    const result = handleAddElement(
      createFrameMock,
      pageBuilderStateMock[PAGE_BUILDER],
    );

    // result
    expect(result).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            allData: {
              ['-1']: {
                ...currentPage.elements.allData['-1'],
                children: [createFrameMock.id],
              },
              [createFrameMock.id]: createFrameMock,
            },
            dynamicData: {
              ['-1']: {
                ...currentPage.elements.dynamicData['-1'],
              },
              [createFrameMock.id]: {
                alignment: {},
                background: createFrameMock.background,
                coordinates: createFrameMock.coordinates,
                deepLevel: createFrameMock.deepLevel,
                height: createFrameMock.height,
                id: createFrameMock.id,
                position: createFrameMock.position,
                rotate: createFrameMock.rotate,
                width: createFrameMock.width,
              },
            },
            staticData: {
              ['-1']: {
                ...currentPage.elements.staticData['-1'],
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
        },
      },
    });
  });
});
