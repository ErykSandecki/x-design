import { render } from '@testing-library/react';

// components
import ColorPrompt from './ColorPrompt';

describe('ColorPrompt snapshots', () => {
  it('should render ColorPrompt', () => {
    // before
    const { asFragment } = render(<ColorPrompt />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
