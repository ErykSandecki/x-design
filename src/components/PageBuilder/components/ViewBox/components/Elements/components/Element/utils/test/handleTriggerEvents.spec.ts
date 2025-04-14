// utils
import { handleTriggerEvents } from '../handleTriggerEvents';

const mockCallBack = jest.fn();

jest.mock('../../../../../../utils/finishSetElementsCoordinates', () => ({
  finishSetElementsCoordinates: () => mockCallBack(),
}));

describe('handleTriggerEvents', () => {
  it(`should not trigger event`, () => {
    // before
    handleTriggerEvents(mockCallBack, true);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });

  it(`should trigger event`, () => {
    // before
    handleTriggerEvents(mockCallBack, false);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
