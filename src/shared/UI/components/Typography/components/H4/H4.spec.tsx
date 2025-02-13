import { render } from '@testing-library/react';

// components
import H4 from './H4';

describe('H4 snapshots', () => {
  it('should render H4', () => {
    //before
    const { asFragment } = render(<H4>H4</H4>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
