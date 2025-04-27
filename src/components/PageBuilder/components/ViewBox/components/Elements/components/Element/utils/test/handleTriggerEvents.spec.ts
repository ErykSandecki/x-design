// utils
import { handleTriggerEvents } from '../handleTriggerEvents';

const mockCallBack = jest.fn();

describe('handleTriggerEvents', () => {
  it(`should trigger event`, () => {
    // before
    handleTriggerEvents(mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
