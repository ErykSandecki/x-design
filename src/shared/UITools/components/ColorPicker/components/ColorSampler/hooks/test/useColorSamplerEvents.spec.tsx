import { renderHook } from '@testing-library/react';

// hooks
import { useColorSamplerEvents } from '../useColorSamplerEvents';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

describe('useColorSamplerEvents', () => {
  it(`should return data`, () => {
    // before
    const { result } = renderHook(() => useColorSamplerEvents(BASE_2D));

    // result
    expect(result.current).toStrictEqual({
      colors: [],
      isPending: true,
      mousePosition: { x: 0, y: 0 },
    });
  });
});
