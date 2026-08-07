import { noop } from 'lodash';

// mocks
import {
  elementMock,
  pageBuilderStateMock,
  selectedElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from '../../slice';

// utils
import { handleSetElementsScoreToCurrentSize } from '../handleSetElementsScoreToCurrentSize';

describe('handleSetElementsScoreToCurrentSize', () => {
  beforeAll(() => {
    // mock
    document.getElementById = (): any => ({ querySelector: noop }) as any;
    window.getComputedStyle = (): any => ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should get value for min height`, () => {
    // mock
    const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];
    const state = {
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: elementMock,
          },
          selectedElements: [selectedElementMock],
        },
      },
    };

    // action
    handleSetElementsScoreToCurrentSize('min', 'height', state);

    // result
    expect(state).toStrictEqual({
      ...pageBuilderStateMock[PAGE_BUILDER],
      pages: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages,
        ['0']: {
          ...currentPage,
          elements: {
            ...currentPage.elements,
            [elementMock.id]: {
              ...elementMock,
              height: {
                ...elementMock.height,
                min: {
                  ...valueExtendMock,
                  value: 100,
                },
              },
            },
          },
          selectedElements: [selectedElementMock],
        },
      },
    });
  });
});
