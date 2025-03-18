// mocks
import {
  elementAllDataMock,
  createFrameMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../actionsType';

// utils
import { handleRotateElement } from '../handleRotateElement';

describe('handleRotateElement', () => {
  it(`should return data with rotated element`, () => {
    // mock
    const rotate = 180;

    // before
    const result = handleRotateElement(
      { id: createFrameMock.id, rotate },
      {
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
      },
    );

    // result
    expect(result).toStrictEqual({
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
});
