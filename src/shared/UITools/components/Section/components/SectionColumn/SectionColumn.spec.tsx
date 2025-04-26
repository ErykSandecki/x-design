import { render } from '@testing-library/react';

// components
import ButtonIcon from 'shared/UITools/components/ButtonIcon/ButtonIcon';
import SectionColumn from './SectionColumn';

describe('SectionColumn snapshots', () => {
  it('should render SectionColumn', () => {
    // before
    const { asFragment } = render(<SectionColumn>children</SectionColumn>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons', () => {
    // before
    const { asFragment } = render(
      <SectionColumn buttonsIcon={[<ButtonIcon name="Close" key={0} />]}>
        children
      </SectionColumn>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons & labels', () => {
    // before
    const { asFragment } = render(
      <SectionColumn
        buttonsIcon={[<ButtonIcon name="Close" key={0} />]}
        labels={['label']}
      >
        children
      </SectionColumn>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
