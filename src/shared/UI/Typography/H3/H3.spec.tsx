import { render } from '@testing-library/react';

// components
import H3 from './H3';

describe('H3 snapshots', () => {
  it('should render H3', () => {
    //before
    const { asFragment } = render(<H3>H3</H3>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
