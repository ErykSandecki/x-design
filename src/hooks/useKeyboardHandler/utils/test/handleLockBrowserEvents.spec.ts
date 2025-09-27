// types
import { KeyboardKeys } from 'types/enums';

// utils
import { handleLockBrowserEvents } from '../handleLockBrowserEvents';

const mockCallBack = jest.fn();

describe('handleLockBrowserEvents', () => {
  it('should lock event when key is "+"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys['+']);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "-"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys['-']);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "D"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.D);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "d"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.d);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "F"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.F);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "f"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.f);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "R"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.R);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "r"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.r);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "S"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.S);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should lock event when key is "s"', () => {
    // before
    handleLockBrowserEvents(true, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.s);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });

  it('should not lock event when control is not pressed', () => {
    // before
    handleLockBrowserEvents(false, { preventDefault: mockCallBack } as unknown as KeyboardEvent, KeyboardKeys.s);

    // result
    expect(mockCallBack.mock.calls.length).toBe(0);
  });
});
