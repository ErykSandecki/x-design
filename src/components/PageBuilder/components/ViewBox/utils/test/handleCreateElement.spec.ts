// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { handleCreateElement } from '../handleCreateElement';

const mockCallBack = jest.fn();

describe('handleCreateElement', () => {
  it(`should create frame and reset data`, () => {
    // before
    handleCreateElement(
      BASE_RECT,
      MouseMode.toolBeltA,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(null);
    expect(mockCallBack.mock.calls[1][0]).toBe(MouseMode.default);
  });

  it(`should not create frame`, () => {
    // before
    handleCreateElement(null, MouseMode.toolBeltA, mockCallBack, mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
