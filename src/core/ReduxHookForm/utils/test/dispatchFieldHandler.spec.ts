// store
import { change } from '../../../../store/reduxHookForm/slice';

// utils
import { dispatchFieldHandler } from '../dispatchFieldHandler';

const mockCallBack = vi.fn();

describe('dispatchFieldHandler', () => {
  const dispatch = dispatchFieldHandler(mockCallBack, 'testForm', 'testField');

  it('should trigger dispatch', () => {
    // action
    dispatch({}, change);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
