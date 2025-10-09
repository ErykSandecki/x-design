// utils
import { stopPropagation } from '../stopPropagation';

const mockCallBack = jest.fn();

describe('stopPropagation', () => {
  it('should trigger propagation', () => {
    // before
    stopPropagation({ stopPropagation: mockCallBack } as any);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
