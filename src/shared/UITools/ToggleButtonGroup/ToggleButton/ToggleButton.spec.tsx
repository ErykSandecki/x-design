import { noop } from 'lodash';

// components
import ToggleButton from './ToggleButton';

// utils
import { customRender } from 'test';

describe('ToggleButton snapshots', () => {
  it('should render ToggleButton', () => {
    // before
    const { asFragment } = customRender(
      <ToggleButton<any>
        currentValue=""
        disabledWhenSelected={false}
        icon="AlignHorizontalCenter"
        onChange={noop}
        value=""
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
