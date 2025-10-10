import { render } from '@testing-library/react';

// components
import ColorResult from './ColorResult';

describe('ColorResult snapshots', () => {
  it('should render ColorResult', () => {
    // before
    const { asFragment } = render(<ColorResult colors={[{ a: 1, b: 0, g: 0, r: 0 }]} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
