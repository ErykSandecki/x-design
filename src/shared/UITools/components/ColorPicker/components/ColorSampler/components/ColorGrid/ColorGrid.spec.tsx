import { render } from '@testing-library/react';

// components
import ColorGrid from './ColorGrid';

describe('ColorGrid snapshots', () => {
  it('should render ColorGrid', () => {
    // before
    const { asFragment } = render(<ColorGrid colors={[{ a: 1, b: 0, g: 0, r: 0 }]} isPending={false} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is pending', () => {
    // before
    const { asFragment } = render(<ColorGrid colors={[{ a: 1, b: 0, g: 0, r: 0 }]} isPending />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
