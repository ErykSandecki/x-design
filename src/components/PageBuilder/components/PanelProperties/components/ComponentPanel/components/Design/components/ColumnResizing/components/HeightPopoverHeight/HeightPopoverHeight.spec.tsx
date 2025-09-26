import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import HeightPopoverHeight from './HeightPopoverHeight';
import { UITools } from 'shared';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('HeightPopoverHeight snapshots', () => {
  it('should render HeightPopoverHeight', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverHeight
          height={elementAllDataMock.height}
          isMixed={false}
        />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverHeight height={elementAllDataMock.width} isMixed />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
