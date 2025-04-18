import { render } from '@testing-library/react';

// components
import ColorPicker from './ColorPicker';

const mockCallBack = jest.fn();

describe('ColorPicker snapshots', () => {
  it('should render ColorPicker', () => {
    // before
    const { asFragment } = render(
      <ColorPicker
        alpha="100"
        color="#ffffff"
        onChangeAlpha={mockCallBack}
        onChangeColor={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
