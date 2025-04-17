import { render } from '@testing-library/react';

// components
import TextField from './TextField';

describe('TextField snapshots', () => {
  it('should render TextField', () => {
    // before
    const { asFragment } = render(<TextField />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
