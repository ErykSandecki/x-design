// types
import { MouseMode } from 'types';

// utils
import { onEscapeChangeMouseModeHandler } from '../onEscapeChangeMouseModeHandler';

const mockCallBack = jest.fn();

describe('onEscapeChangeMouseModeHandler', () => {
  it('should trigger callback', () => {
    // before
    onEscapeChangeMouseModeHandler(mockCallBack, mockCallBack);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(MouseMode.default);
    expect(mockCallBack.mock.calls[1][0].payload).toStrictEqual({ colorSampler: false });
  });
});
