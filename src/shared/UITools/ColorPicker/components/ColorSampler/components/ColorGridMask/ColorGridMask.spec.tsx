import { fireEvent, render } from '@testing-library/react';

// components
import ColorGridMask from './ColorGridMask';

// types
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  rgbToHex: jest.fn(),
}));

describe('ColorGrid snapshots', () => {
  it('should render ColorGrid', () => {
    // before
    const { asFragment } = render(
      <ColorGridMask colors={[{ a: 1, b: 0, g: 0, r: 0 }]} onClickColorSampler={mockCallBack} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('ColorGrid behaviors', () => {
  it('should get sample of color', () => {
    // before
    const { container } = render(
      <ColorGridMask colors={[{ a: 1, b: 0, g: 0, r: 0 }]} onClickColorSampler={mockCallBack} />,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.button, 'color-sampler'));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
