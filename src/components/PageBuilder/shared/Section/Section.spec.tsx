import { render } from '@testing-library/react';

// components
import Section from './Section';

describe('Section snapshots', () => {
  it('should render Section', () => {
    // mock

    // before
    const { asFragment } = render(<Section label="label">children</Section>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
