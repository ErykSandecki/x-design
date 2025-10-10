import { MouseEvent } from 'react';

// utils
import { handlePressing } from '../handlePressing';

const mockCallBack = jest.fn();

describe('handlePressing', () => {
  it(`should trigger event`, () => {
    // before
    handlePressing({ shiftKey: false } as MouseEvent, mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it(`should not trigger event`, () => {
    // before
    handlePressing({ shiftKey: true } as MouseEvent, mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
