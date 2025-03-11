// utils
import { finishSetElementsCoordinates } from '../finishSetElementsCoordinates';

const mockCallBack = jest.fn();

describe('finishSetElementsCoordinates', () => {
  it(`should finish set coordinates`, () => {
    // before
    finishSetElementsCoordinates(mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0].payload).toStrictEqual({
      isMultipleMoving: false,
    });
  });
});
