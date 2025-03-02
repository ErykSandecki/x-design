// others
import { BASE_RECT } from 'shared/ZoomBox/constants';

// types
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { handleCreateElement } from '../handleCreateElement';
import { createFrameMock } from 'test/mocks/reducer/pageBuilderMock';

const mockCallBack = jest.fn();

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  generateID: () => '1',
}));

describe('handleCreateElement', () => {
  it(`should create frame and reset data`, () => {
    // before
    handleCreateElement(
      mockCallBack,
      BASE_RECT,
      MouseMode.toolBeltA,
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual(
      createFrameMock,
    );
    expect(mockCallBack.mock.calls[1][0]).toBe(null);
    expect(mockCallBack.mock.calls[2][0]).toBe(MouseMode.default);
  });

  it(`should not create frame`, () => {
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
