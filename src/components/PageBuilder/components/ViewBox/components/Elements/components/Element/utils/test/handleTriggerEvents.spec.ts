// utils
import { handleTriggerEvents } from '../handleTriggerEvents';

const mockCallBack = jest.fn();

jest.mock('lodash', () => ({
  ...jest.requireActual('lodash'),
  defer: (callback: any) => callback(),
}));

describe('handleTriggerEvents', () => {
  it(`should trigger event`, () => {
    // before
    handleTriggerEvents(mockCallBack);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
