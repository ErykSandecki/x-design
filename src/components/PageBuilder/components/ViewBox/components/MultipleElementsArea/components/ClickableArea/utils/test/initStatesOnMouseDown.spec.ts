import { MouseEvent } from 'react';

// utils
import { initStatesOnMouseDown } from '../initStatesOnMouseDown';

const mockCallBack = jest.fn();

describe('initStatesOnMouseDown', () => {
  it('should trigger events', () => {
    // before
    initStatesOnMouseDown(
      mockCallBack,
      { shiftKey: false } as MouseEvent,
      '1',
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(2);
  });

  it('should not trigger events but unselect item', () => {
    // before
    initStatesOnMouseDown(
      mockCallBack,
      { shiftKey: true } as MouseEvent,
      '1',
      mockCallBack,
      mockCallBack,
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
