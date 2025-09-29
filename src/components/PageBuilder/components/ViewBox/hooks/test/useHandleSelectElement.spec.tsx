import { RefObject } from 'react';
import { renderHook } from '@testing-library/react';

// hooks
import { useHandleSelectElement } from '../useHandleSelectElement';

// mocks
import { elementMock, pageBuilderStateMock, selectedElementMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { store as storeToMock } from 'store/store';

// types
import { TObject } from 'types';

const mockCallBack = jest.fn();
const rectCoordinates = {
  current: {
    [elementMock.id]: {
      x1: elementMock.coordinates.x,
      x2: elementMock.width.value,
      y1: elementMock.coordinates.y,
      y2: elementMock.height.value,
    },
  },
} as RefObject<TObject<TRectCoordinates>>;
const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    pages: {
      ...pageBuilderStateMock[PAGE_BUILDER].pages,
      ['0']: {
        ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
        elements: {
          ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements,
          [elementMock.id]: elementMock,
        },
      },
    },
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: (): any => mockCallBack,
}));

describe('useHandleSelectElement', () => {
  beforeAll(() => {
    storeToMock.getState = (): any => stateMock as any;
  });

  it(`should select items`, () => {
    // before
    renderHook(() =>
      useHandleSelectElement(rectCoordinates, {
        visible: true,
        x1: 0,
        x2: 100,
        y1: 0,
        y2: 100,
      }),
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual([selectedElementMock]);
  });

  it(`should not select items when list is empty`, () => {
    // mock
    storeToMock.getState = (): any =>
      ({
        ...stateMock,
        [PAGE_BUILDER]: {
          ...pageBuilderStateMock[PAGE_BUILDER],
          pages: {
            ...pageBuilderStateMock[PAGE_BUILDER].pages,
            ['0']: {
              ...pageBuilderStateMock[PAGE_BUILDER].pages['0'],
              elements: {
                ...pageBuilderStateMock[PAGE_BUILDER].pages['0'].elements,
                [elementMock.id]: elementMock,
              },
              selectedElements: [],
            },
          },
        },
      }) as any;

    // before
    renderHook(() =>
      useHandleSelectElement(rectCoordinates, {
        visible: true,
        x1: 200,
        x2: 300,
        y1: 200,
        y2: 300,
      }),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should not select items`, () => {
    // before
    renderHook(() => useHandleSelectElement(rectCoordinates, null));

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
