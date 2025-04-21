import { MouseEvent } from 'react';

// utils
import { initStatesOnMouseDown } from '../initStatesOnMouseDown';

const mockCallBack = jest.fn();

describe('initStatesOnMouseDown', () => {
  it('should trigger events', () => {
    // before
    initStatesOnMouseDown(
      { shiftKey: false } as MouseEvent,
      '1',
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it('should not trigger events', () => {
    // before
    initStatesOnMouseDown(
      { shiftKey: true } as MouseEvent,
      '1',
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
