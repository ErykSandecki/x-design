// components
import ColorPrompt from './ColorPrompt';

// utils
import { customRender } from 'test';

describe('ColorPrompt snapshots', () => {
  it('should render ColorPrompt', () => {
    // before
    const { asFragment } = customRender(<ColorPrompt />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
