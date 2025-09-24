import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useElementSizes } from '../useElementSizes';

// mocks
import {
  elementAllDataMock,
  elementDynamicDataMock,
  elementStaticDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// utils
import { getProviderWrapper } from 'test';
import { createHtmlElement } from 'utils';

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
          allData: {
            ['-1']: {
              ...currentPage.elements.allData['-1'],
              children: [elementAllDataMock.id],
            },
            [elementAllDataMock.id]: elementAllDataMock,
          },
          dynamicData: {
            ['-1']: {
              ...currentPage.elements.dynamicData['-1'],
              children: [elementDynamicDataMock.id],
            },
            [elementDynamicDataMock.id]: elementDynamicDataMock,
          },
          staticData: {
            ['-1']: {
              ...currentPage.elements.staticData['-1'],
              children: [elementStaticDataMock.id],
            },
            [elementStaticDataMock.id]: elementStaticDataMock,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('useElementEvents', () => {
  beforeAll(() => {
    // mock
    window.getComputedStyle = () =>
      ({ height: '100px', width: '100px' }) as CSSStyleDeclaration;
  });

  it(`should return sizes from html data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(
      () => useElementSizes(selectedElementMock.id),
      {
        wrapper: ({ children }) => {
          const Wrapper = getProviderWrapper(store);

          return (
            <Wrapper>
              <RefsProvider>{children}</RefsProvider>
            </Wrapper>
          );
        },
      },
    );

    // result
    expect(result.current).toStrictEqual({
      cssHeight: 100,
      cssWidth: 100,
      height: 100,
      width: 100,
    });
  });

  it(`should return sizes`, () => {
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
              allData: {
                ['-1']: {
                  ...currentPage.elements.allData['-1'],
                  children: [elementAllDataMock.id],
                },
                [elementAllDataMock.id]: {
                  ...elementAllDataMock,
                  height: 'auto',
                  width: 'auto',
                },
              },
              dynamicData: {
                ['-1']: {
                  ...currentPage.elements.dynamicData['-1'],
                  children: [elementDynamicDataMock.id],
                },
                [elementDynamicDataMock.id]: {
                  ...elementDynamicDataMock,
                  height: 'auto',
                  width: 'auto',
                },
              },
              staticData: {
                ['-1']: {
                  ...currentPage.elements.staticData['-1'],
                  children: [elementStaticDataMock.id],
                },
                [elementStaticDataMock.id]: elementStaticDataMock,
              },
            },
            selectedElements: [selectedElementMock],
          },
        },
      },
    });

    // before
    const { result } = renderHook(
      () => useElementSizes(selectedElementMock.id),
      {
        wrapper: ({ children }) => {
          const Wrapper = getProviderWrapper(store);

          return (
            <Wrapper>
              <RefsProvider
                itemsRefs={{
                  [elementAllDataMock.id]: createHtmlElement('div'),
                }}
              >
                {children}
              </RefsProvider>
            </Wrapper>
          );
        },
      },
    );

    // result
    expect(result.current).toStrictEqual({
      cssHeight: 'auto',
      cssWidth: 'auto',
      height: 100,
      width: 100,
    });
  });
});
