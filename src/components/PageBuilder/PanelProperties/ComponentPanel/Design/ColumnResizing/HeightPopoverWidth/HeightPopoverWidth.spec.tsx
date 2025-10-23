import { noop } from 'lodash';

// components
import HeightPopoverWidth from './HeightPopoverWidth';
import { UITools } from 'shared';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('HeightPopoverWidth snapshots', () => {
  it('should render HeightPopoverWidth', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth isMixed={false} width={elementMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth isMixed width={elementMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
