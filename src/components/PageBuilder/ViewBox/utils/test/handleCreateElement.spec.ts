// mocks
import {
  createFrameMock,
  eventsMock,
  pageBuilderStateMock,
  possibleElementMock,
  valueExtendMock,
} from 'test/mocks/reducer/pageBuilderMock';

// others
import { REDUCER_KEY as PAGE_BUILDER } from 'store/pageBuilder/actionsType';

// store
import { configureStore } from 'store/store';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { handleCreateElement } from '../handleCreateElement';

const mockCallBack = jest.fn();
const stateMock = {
  [PAGE_BUILDER]: {
    ...pageBuilderStateMock[PAGE_BUILDER],
    events: {
      ...eventsMock,
      possibleElement: possibleElementMock,
    },
  },
};

describe('handleCreateElement', () => {
  it(`should create element and reset data`, () => {
    // mock
    window.store = configureStore(stateMock);

    // before
    handleCreateElement(mockCallBack, MouseMode.toolBeltA, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      ...createFrameMock,
      deepLevel: 0,
    });
    expect(mockCallBack.mock.calls[1][0]).toBe(MouseMode.default);
  });

  it(`should create element when y2 & x2 are bigger than rest cords`, () => {
    // mock
    window.store = configureStore({
      ...stateMock,
      [PAGE_BUILDER]: {
        ...stateMock[PAGE_BUILDER],
        events: {
          ...stateMock[PAGE_BUILDER].events,
          possibleElement: {
            ...stateMock[PAGE_BUILDER].events.possibleElement,
            x1: 0,
            x2: 100,
            y1: 0,
            y2: 100,
          },
        },
      },
    });

    // before
    handleCreateElement(mockCallBack, MouseMode.toolBeltA, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      ...createFrameMock,
      coordinates: {
        x: 0,
        y: 0,
      },
      deepLevel: 0,
      height: { ...valueExtendMock, value: 100 },
      width: { ...valueExtendMock, value: 100 },
    });
    expect(mockCallBack.mock.calls[1][0]).toBe(MouseMode.default);
  });

  it(`should not create element`, () => {
    // mock
    window.store = configureStore(stateMock);

    // before
    handleCreateElement(mockCallBack, MouseMode.default, mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
