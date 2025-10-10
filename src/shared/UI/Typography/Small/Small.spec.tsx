import { render } from '@testing-library/react';

// components
import Small from './Small';

describe('Small snapshots', () => {
  it('should render Small', () => {
    //before
    const { asFragment } = render(<Small>Small</Small>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
