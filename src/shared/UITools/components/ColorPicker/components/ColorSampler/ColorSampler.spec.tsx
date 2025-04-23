import { fireEvent, render } from '@testing-library/react';

// components
import ColorSampler from './ColorSampler';

// hooks
import { useColorSamplerEvents } from './hooks/useColorSamplerEvents';

// others
import { BASE_2D } from 'shared/ZoomBox/constants';

// types
import { E2EAttribute } from 'types/e2e';

// utils
import { getByE2EAttribute } from 'test/testHelpers';

const mockCallBack = jest.fn();

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  rgbToHex: jest.fn(),
}));

jest.mock('./hooks/useColorSamplerEvents', () => ({
  useColorSamplerEvents: jest.fn(),
}));

describe('ColorSampler snapshots', () => {
  it('should render ColorSampler', () => {
    // mock
    (useColorSamplerEvents as jest.Mock).mockImplementation(() => ({
      colors: Array.from(Array(49), () => ({ a: 0, b: 0, g: 0, r: 0 })),
      isPending: false,
      mousePosition: { x: 0, y: 0 },
    }));

    // before
    const { asFragment } = render(
      <ColorSampler
        initialMousePosition={BASE_2D}
        onClickColorSampler={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is pending', () => {
    // mock
    (useColorSamplerEvents as jest.Mock).mockImplementation(() => ({
      colors: [],
      isPending: true,
      mousePosition: { x: 0, y: 0 },
    }));

    // before
    const { asFragment } = render(
      <ColorSampler
        initialMousePosition={BASE_2D}
        onClickColorSampler={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColorSampler behaviors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get sample of color', () => {
    // mock
    (useColorSamplerEvents as jest.Mock).mockImplementation(() => ({
      colors: [],
      isPending: false,
      mousePosition: { x: 0, y: 0 },
    }));

    // before
    const { container } = render(
      <ColorSampler
        initialMousePosition={BASE_2D}
        onClickColorSampler={mockCallBack}
      />,
    );

    // action
    fireEvent.click(
      getByE2EAttribute(container, E2EAttribute.button, 'color-sampler'),
    );

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
