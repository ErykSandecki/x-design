import { renderHook } from '@testing-library/react';

// hooks
import { useBlendModeEvents } from '../useBlendModeEvents';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/slice';

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
          [elementMock.id]: elementMock,
        },
        selectedElements: [selectedElementMock],
      },
    },
  },
};

vi.mock('lodash', async (importOriginal) => ({
  ...((await importOriginal()) as any).default,
  defer: (callback: any): any => callback(),
}));

describe('useRotationEvents', () => {
  it(`should return data`, () => {
    // mock
    const store = configureStore(stateMock);

    // before
    const { result } = renderHook(() => useBlendModeEvents(), { wrapper: getProviderWrapper(store) });

    // result
    expect(result.current).toStrictEqual({
      isMixedBlendMode: false,
      mixBlendMode: 'initial',
    });
  });
});
