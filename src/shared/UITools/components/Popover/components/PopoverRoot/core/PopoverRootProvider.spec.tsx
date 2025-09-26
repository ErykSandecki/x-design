import { noop } from 'lodash';
import { render } from '@testing-library/react';

// core
import { PopoverRootProvider } from './PopoverRootProvider';

describe('PopoverRootProvider snapshots', () => {
  it('should redner PopoverRootProvider', () => {
    // before
    const { asFragment } = render(
      <PopoverRootProvider setSelected={noop}>children</PopoverRootProvider>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
