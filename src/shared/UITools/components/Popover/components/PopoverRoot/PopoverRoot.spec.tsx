import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import PopoverRoot from './PopoverRoot';

describe('PopoverRoot snapshots', () => {
  it('should render PopoverRoot', () => {
    // before
    const { asFragment } = render(
      <PopoverRoot setSelected={noop}>children</PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
