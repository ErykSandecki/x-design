import { render } from '@testing-library/react';

// components
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Section from './Section';

describe('Section snapshots', () => {
  it('should render Section', () => {
    // before
    const { asFragment } = render(<Section label="label">children</Section>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons', () => {
    // before
    const { asFragment } = render(
      <Section buttonsIcon={[<ButtonIcon name="Close" key={0} />]} label="label">
        children
      </Section>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
