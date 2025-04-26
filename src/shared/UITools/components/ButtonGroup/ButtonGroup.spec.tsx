import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import ButtonGroup from './ButtonGroup';

describe('ButtonGroup snapshots', () => {
  it('should render ButtonGroup', () => {
    // before
    const { asFragment } = render(
      <ButtonGroup
        buttons={[
          { name: 'AlignHorizontalLeft', onClick: noop },
          { name: 'AlignHorizontalCenter', onClick: noop },
          { name: 'AlignHorizontalRight', onClick: noop },
        ]}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with disabled states', () => {
    // before
    const { asFragment } = render(
      <ButtonGroup
        buttons={[
          { disabled: true, name: 'AlignHorizontalLeft', onClick: noop },
          { disabled: true, name: 'AlignHorizontalCenter', onClick: noop },
          { disabled: true, name: 'AlignHorizontalRight', onClick: noop },
        ]}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
