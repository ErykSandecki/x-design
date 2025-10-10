import { noop } from 'lodash';

// components
import ButtonGroup from './ButtonGroup';
import { customRender } from 'test';

describe('ButtonGroup snapshots', () => {
  it('should render ButtonGroup', () => {
    // before
    const { asFragment } = customRender(
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
    const { asFragment } = customRender(
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
