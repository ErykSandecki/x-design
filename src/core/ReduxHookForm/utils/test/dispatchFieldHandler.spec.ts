// others
import { CHANGE } from '../../../../store/reduxHookForm/actionsType';

// utils
import { dispatchFieldHandler } from '../dispatchFieldHandler';

const mockCallBack = jest.fn();

describe('dispatchFieldHandler', () => {
  const dispatch = dispatchFieldHandler(mockCallBack, 'testForm', 'testField');

  it('should trigger dispatch', () => {
    // action
    dispatch({}, CHANGE);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
