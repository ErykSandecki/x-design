// components
import ColorSampler from './ColorSampler';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

// types
import type { Mock } from 'vitest';

// utils
import { customRender } from 'test';

const mockCallBack = vi.fn();

vi.mock('utils', async (importOriginal) => ({
  ...(await importOriginal()),
  rgbToHex: vi.fn(),
}));

vi.mock('./hooks/useColorSamplerEvents', () => ({
  useColorSamplerEvents: vi.fn(),
}));

describe('ColorSampler snapshots', () => {
  it('should render ColorSampler', () => {
    // mock
    (useColorSamplerEvents as Mock).mockImplementation(() => ({
      colors: Array.from(Array(49), () => ({ a: 0, b: 0, g: 0, r: 0 })),
      isPending: false,
      mousePosition: { x: 0, y: 0 },
    }));

    // before
    const { asFragment } = customRender(
      <ColorSampler initialMousePosition={BASE_2D} onClickColorSampler={mockCallBack} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
