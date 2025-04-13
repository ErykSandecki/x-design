import { renderHook } from '@testing-library/react';

// hooks
import { useHandleSelectElement } from '../useHandleSelectElement';

// mocks
import {
  elementAllDataMock,
  pageBuilderStateMock,
  selectedElementMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

const mockCallBack = jest.fn();

const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    elements: {
      allData: {
        [elementAllDataMock.id]: elementAllDataMock,
      },
    },
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockCallBack,
}));

describe('useHandleSelectElement', () => {
  beforeAll(() => {
    storeToMock.getState = () => stateMock as any;
  });

  it(`should select items`, () => {
    // before
    renderHook(() =>
      useHandleSelectElement({ x1: 0, x2: 100, y1: 0, y2: 100 }),
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual([
      {
        ...selectedElementMock,
        coordinates: {
          ...selectedElementMock.coordinates,
          x2: 100,
          y2: 100,
        },
      },
    ]);
  });

  it(`should not select items when are the same selected`, () => {
    // mock
    storeToMock.getState = () =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          elements: {
            allData: {
              [elementAllDataMock.id]: elementAllDataMock,
            },
          },
          selectedElements: [selectedElementMock],
        },
      }) as any;

    // before
    renderHook(() =>
      useHandleSelectElement({ x1: 0, x2: 100, y1: 0, y2: 100 }),
    );

    // result
    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not select items`, () => {
    // before
    renderHook(() => useHandleSelectElement(null));

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
