// components
import ButtonIcon from './ButtonIcon';

// utils
import { customRender } from 'test';

describe('ButtonIcon snapshots', () => {
  it('should render ButtonIcon', () => {
    // before
    const { asFragment } = customRender(<ButtonIcon name="Close" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is selected', () => {
    // before
    const { asFragment } = customRender(<ButtonIcon name="Close" selected />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
