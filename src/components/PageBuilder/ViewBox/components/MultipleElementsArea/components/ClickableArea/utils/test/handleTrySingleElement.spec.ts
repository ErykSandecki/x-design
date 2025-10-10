// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store';

// utils
import { handleTrySingleElement } from '../handleTrySingleElement';

const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];

const mockCallBack = jest.fn();

describe('handleTrySingleElement', () => {
  beforeAll(() => {
    // mock
    storeToMock.getState = (): any =>
      ({
        ...wholeStateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            [currentPage.id]: {
              ...currentPage,
              elements: {
                ...currentPage.elements,
                [selectedElementMock.id]: {
                  ...elementMock,
                },
              },
            },
          },
        },
      }) as any;
  });

  it('should select element', () => {
    // before
    handleTrySingleElement(mockCallBack, false, 'test-1');

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not select element', () => {
    // before
    handleTrySingleElement(mockCallBack, true, 'test-1');

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
