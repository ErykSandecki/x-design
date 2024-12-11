// utils
import { toggleOverscroollBehaviorX } from '../toggleOverscroollBehaviorX';

describe('toggleOverscroollBehaviorX', () => {
  it('should toggle over scroll on dom', () => {
    // before
    toggleOverscroollBehaviorX('none');

    // result
    expect(document.body.style.overscrollBehaviorX).toBe('none');
  });
});
