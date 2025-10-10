import { render } from '@testing-library/react';

// components
import H2 from './H2';

describe('H2 snapshots', () => {
  it('should render H2', () => {
    //before
    const { asFragment } = render(<H2>H2</H2>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
