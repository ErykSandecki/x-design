// mocks
import { createFrameMock } from 'test/mocks/reducer/pageBuilderMock';

// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { handleCreateElement } from '../handleCreateElement';

const mockCallBack = jest.fn();

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  generateID: () => '1',
}));

describe('handleCreateElement', () => {
  it(`should create element and reset data`, () => {
    // before
    handleCreateElement(
      mockCallBack,
      BASE_RECT,
      MouseMode.toolBeltA,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      ...createFrameMock,
    });
    expect(mockCallBack.mock.calls[1][0]).toBe(null);
    expect(mockCallBack.mock.calls[2][0]).toBe(MouseMode.default);
  });

  it(`should create element when y2 & x2 are bigger than rest cords`, () => {
    // before
    handleCreateElement(
      mockCallBack,
      { ...BASE_RECT, x2: 100, y2: 100 },
      MouseMode.toolBeltA,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      ...createFrameMock,
      height: { value: 100 },
      width: { value: 100 },
    });
    expect(mockCallBack.mock.calls[1][0]).toBe(null);
    expect(mockCallBack.mock.calls[2][0]).toBe(MouseMode.default);
  });

  it(`should not create element`, () => {
    // before
    handleCreateElement(
      mockCallBack,
      null,
      MouseMode.toolBeltA,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
