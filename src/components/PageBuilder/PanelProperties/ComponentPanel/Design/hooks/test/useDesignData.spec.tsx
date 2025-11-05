import { renderHook } from '@testing-library/react';

// core
import { RefsProvider } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useDesignData } from '../useDesignData';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store';

// utils
import { getProviderWrapper } from 'test';

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
          [elementMock.id]: {
            ...elementMock,
          },
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

describe('useDesignData', () => {
  it(`should return events and data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useDesignData(), {
      wrapper: ({ children }) => {
        const Wrapper = getProviderWrapper(store);

        return (
          <Wrapper>
            <RefsProvider>{children}</RefsProvider>
          </Wrapper>
        );
      },
    });

    // result
    expect(result.current).toStrictEqual({
      isBorderRaiusModeMerged: true,
      onChangeLayoutType: expect.any(Function),
      setBorderRadiusMode: expect.any(Function),
    });
  });
});
