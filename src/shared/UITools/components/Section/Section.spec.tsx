// components
import ButtonIcon from '../ButtonIcon/ButtonIcon';
import Section from './Section';

// utils
import { customRender } from 'test';

describe('Section snapshots', () => {
  it('should render Section', () => {
    // before
    const { asFragment } = customRender(<Section label="label">children</Section>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons', () => {
    // before
    const { asFragment } = customRender(
      <Section buttonsIcon={[<ButtonIcon name="Close" key={0} />]} label="label">
        children
      </Section>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
