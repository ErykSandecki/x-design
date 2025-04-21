import { render } from '@testing-library/react';

// core
import { RefsProvider } from './RefsProvider';

describe('RefsProvider snapshots', () => {
  it('should redner RefsProvider', () => {
    // before
    const { asFragment } = render(<RefsProvider>children</RefsProvider>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
