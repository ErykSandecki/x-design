import { render } from '@testing-library/react';

// components
import H1 from './H1';

describe('H1 snapshots', () => {
  it('should render H1', () => {
    //before
    const { asFragment } = render(<H1>H1</H1>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
