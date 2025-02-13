import { render } from '@testing-library/react';

// components
import P from './P';

describe('P snapshots', () => {
  it('should render P', () => {
    //before
    const { asFragment } = render(<P>P</P>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
