import { Color } from 'antd/es/color-picker';
import { renderHook } from '@testing-library/react';

// hooks
import { useOnChangeColorPickerEvent } from '../useOnChangeColorPickerEvent';

const mockCallBack = jest.fn();

describe('useOnChangeColorPickerEvent', () => {
  it(`should trigger on change`, () => {
    // before
    const { result } = renderHook(() =>
      useOnChangeColorPickerEvent(mockCallBack),
    );

    // action
    result.current({
      toHex: () => '#ffffff',
      toRgb: () => ({ a: 1, b: 1, g: 1, r: 1 }),
    } as Color);

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
