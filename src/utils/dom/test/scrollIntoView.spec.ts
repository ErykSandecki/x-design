// utils
import { scrollIntoView } from '../scrollIntoView';

const mockCallBack = jest.fn();

describe('scrollIntoView', () => {
  it('Should scroll into element', () => {
    // before
    scrollIntoView('smooth', {
      scrollIntoView: mockCallBack,
    } as unknown as Element);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
