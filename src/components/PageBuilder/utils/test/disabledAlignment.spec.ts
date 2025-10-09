// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// utils
import { disabledAlignment } from '../disabledAlignment';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages['0'];

describe('disabledAlignment', () => {
  it('should be disabled', () => {
    // mock
    storeToMock.getState = (): any =>
      ({
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
              elements: {
                ...currentPage.elements,
                [elementMock.id]: {
                  ...elementMock,
                },
              },
              selectedElements: [selectedElementMock],
            },
          },
        },
      }) as any;

    // before
    const result = disabledAlignment();

    // result
    expect(result).toBe(true);
  });

  it('should be disabled', () => {
    // mock
    storeToMock.getState = (): any =>
      ({
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
              elements: {
                ...currentPage.elements,
                [elementMock.id]: {
                  ...elementMock,
                },
                ['test-2']: {
                  ...elementMock,
                  id: 'test-2',
                  parentId: 'test-1',
                  position: 'absolute',
                },
              },
              selectedElements: [
                { ...selectedElementMock, id: 'test-2', parentId: 'test-1' },
                { ...selectedElementMock, id: 'test-3', parentId: '-1' },
              ],
            },
          },
        },
      }) as any;

    // before
    const result = disabledAlignment();

    // result
    expect(result).toBe(true);
  });

  it('should not be disabled', () => {
    // mock
    storeToMock.getState = (): any =>
      ({
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
              selectedElements: [],
            },
          },
        },
      }) as any;

    // before
    const result = disabledAlignment();

    // result
    expect(result).toBe(true);
  });
});
