import { render } from '@testing-library/react';

// components
import ConstrainsView from './ConstrainsView';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

describe('ConstrainsView snapshots', () => {
  it('should render ConstrainsView', () => {
    // before
    const { asFragment } = render(<ConstrainsView alignment={undefined} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with alignment', () => {
    // before
    const { asFragment } = render(
      <ConstrainsView
        alignment={{
          horizontal: AlignmentHorizontal.center,
          vertical: AlignmentVertical.center,
        }}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render selected', () => {
    // before
    const { asFragment } = render(
      <ConstrainsView alignment={undefined} selected />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
