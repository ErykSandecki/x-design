import { render } from '@testing-library/react';

// components
import SectionColumn from './SectionColumn';

describe('SectionColumn snapshots', () => {
  it('should render SectionColumn', () => {
    // before
    const { asFragment } = render(<SectionColumn>children</SectionColumn>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
