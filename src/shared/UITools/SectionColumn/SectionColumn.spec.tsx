// components
import ButtonIcon from 'shared/UITools/ButtonIcon/ButtonIcon';
import SectionColumn from './SectionColumn';

// utils
import { customRender } from 'test';

describe('SectionColumn snapshots', () => {
  it('should render SectionColumn', () => {
    // before
    const { asFragment } = customRender(<SectionColumn>children</SectionColumn>);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons', () => {
    // before
    const { asFragment } = customRender(
      <SectionColumn buttonsIcon={[<ButtonIcon name="Close" key={0} />]}>children</SectionColumn>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons and input connector', () => {
    // before
    const { asFragment } = customRender(
      <SectionColumn buttonsIcon={[<ButtonIcon name="Close" key={0} />]} inputConnector>
        children
      </SectionColumn>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with buttons & labels', () => {
    // before
    const { asFragment } = customRender(
      <SectionColumn buttonsIcon={[<ButtonIcon name="Close" key={0} />]} labels={['label']}>
        children
      </SectionColumn>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
