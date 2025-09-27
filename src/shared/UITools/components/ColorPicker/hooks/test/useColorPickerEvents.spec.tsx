import { noop } from 'lodash';
import { renderHook } from '@testing-library/react';

// hooks
import { useColorPickerEvents } from '../useColorPickerEvents';

describe('useColorPickerEvents', () => {
  it(`should return view moveable events and data`, () => {
    // before
    const { result } = renderHook(() => useColorPickerEvents('100', '#ffffff', noop, noop));

    // result
    expect(result.current).toStrictEqual({
      alphaValue: '100',
      colorValue: 'ffffff',
      onBlurAlpha: expect.any(Function),
      onBlurColor: expect.any(Function),
      onChangeAlpha: expect.any(Function),
      onChangeColor: expect.any(Function),
      onChangeColorPicker: expect.any(Function),
    });
  });
});
