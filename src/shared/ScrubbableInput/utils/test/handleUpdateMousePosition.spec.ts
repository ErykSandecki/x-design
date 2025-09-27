// others
import { BASE_2D } from 'shared';

// utils
import { handleUpdateMousePosition } from '../handleUpdateMousePosition';

const mockCallBack = jest.fn();

describe('handleUpdateMousePosition', () => {
  beforeAll(() => {
    // mock
    window.innerHeight = 1000;
    window.innerWidth = 1000;
  });

  it('should change coordinates', () => {
    // before
    handleUpdateMousePosition({ movementX: 1 } as MouseEvent, BASE_2D, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 1, y: 0 });
  });

  it('should move to the right when is below the width', () => {
    // before
    handleUpdateMousePosition({ movementX: 1 } as MouseEvent, { x: -100, y: 0 }, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 1000, y: 0 });
  });

  it('should move to the left when is above the width', () => {
    // before
    handleUpdateMousePosition({ movementX: 1 } as MouseEvent, { x: 1001, y: 0 }, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0]).toStrictEqual({ x: 0, y: 0 });
  });
});
