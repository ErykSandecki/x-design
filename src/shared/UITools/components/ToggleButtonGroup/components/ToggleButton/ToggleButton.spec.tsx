import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import ToggleButton from './ToggleButton';

describe('ToggleButton snapshots', () => {
  it('should render ToggleButton', () => {
    // before
    const { asFragment } = render(
      <ToggleButton<any> currentValue="" icon="AlignHorizontalCenter" onChange={noop} value="" />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
