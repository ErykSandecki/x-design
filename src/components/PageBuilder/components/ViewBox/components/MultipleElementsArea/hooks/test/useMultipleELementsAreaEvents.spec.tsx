import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useMultipleELementsAreaEvents } from '../useMultipleELementsAreaEvents';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';
import { wholeStateMock } from 'test/mocks/reducer/wholeStateMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore, store as storeToMock } from 'store/store';

// utils
import { getProviderWrapper } from 'test';

const element = document.createElement('div');
const currentPage = pageBuilderStateMock[PAGE_BUILDER].pages[pageBuilderStateMock[PAGE_BUILDER].currentPage];
const overlayContainer = document.createElement('div');
const zoomContent = document.createElement('div');

const sharedRefs = {
  [elementMock.id]: element,
  ['2']: element,
};

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...currentPage.elements,
          allData: {
            ...currentPage.elements.allData,
            [elementMock.id]: {
              ...elementMock,
            },
            ['2']: {
              ...elementMock,
              id: '2',
            },
          },
        },
        selectedElements: [
          selectedElementMock,
          {
            ...selectedElementMock,
            id: '2',
          },
        ],
      },
    },
  },
};

jest.mock('lodash', () => ({
  ...(jest.requireActual('lodash') as object),
  defer: (callback: any): any => callback(),
}));

describe('useMultipleELementsAreaEvents', () => {
  beforeAll(() => {
    // mock
    element.style.height = '100px';
    element.style.width = '100px';
    zoomContent.style.height = '1000px';
    zoomContent.style.width = '1000px';
    document.body.appendChild(overlayContainer);
    document.body.appendChild(zoomContent);
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
                allData: {
                  ...currentPage.elements.allData,
                  [selectedElementMock.id]: {
                    ...elementMock,
                  },
                  ['2']: {
                    ...elementMock,
                    id: '2',
                  },
                },
              },
            },
          },
        },
      }) as any;
  });

  it(`should setCoordinates`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useMultipleELementsAreaEvents(), {
      wrapper: ({ children }) => {
        const Wrapper = getProviderWrapper(store);

        return (
          <Wrapper>
            <RefsProvider
              itemsRefs={sharedRefs}
              overlayContainerRefHtml={overlayContainer}
              zoomContentRefHtml={zoomContent}
            >
              {children}
            </RefsProvider>
          </Wrapper>
        );
      },
    });

    // result
    expect(result.current).toStrictEqual({
      coordinatesData: {
        elementsCoordinates: [
          { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: 'test-1' },
          { coordinates: { x1: 0, x2: 100, y1: 0, y2: 100 }, id: '2' },
        ],
        outline: { x1: -0.75, x2: 100.75, y1: -0.75, y2: 100.75 },
      },
      showCorners: true,
    });
  });
});
