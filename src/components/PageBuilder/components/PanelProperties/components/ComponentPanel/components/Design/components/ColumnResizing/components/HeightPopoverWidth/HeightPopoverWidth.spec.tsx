import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import HeightPopoverWidth from './HeightPopoverWidth';
import { UITools } from 'shared';

// mocks
import { elementAllDataMock } from 'test/mocks/reducer/pageBuilderMock';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('HeightPopoverWidth snapshots', () => {
  it('should render HeightPopoverWidth', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth isMixed={false} width={elementAllDataMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth isMixed width={elementAllDataMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
