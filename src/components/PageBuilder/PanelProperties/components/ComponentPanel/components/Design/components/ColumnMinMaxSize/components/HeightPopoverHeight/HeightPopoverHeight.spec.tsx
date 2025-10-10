import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import HeightPopoverHeight from './HeightPopoverHeight';
import { UITools } from 'shared';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('HeightPopoverHeight snapshots', () => {
  it('should render HeightPopoverHeight{max}', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverHeight score="max" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeightPopoverHeight{min}', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverHeight score="min" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
