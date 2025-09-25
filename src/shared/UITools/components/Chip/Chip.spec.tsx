import { render } from '@testing-library/react';

// components
import Chip from './Chip';

describe('Chip snapshots', () => {
  it('should render Chip', () => {
    // before
    const { asFragment } = render(<Chip e2eValue="chip">chip</Chip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with empty children', () => {
    // before
    const { asFragment } = render(<Chip e2eValue="chip">{''}</Chip>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
