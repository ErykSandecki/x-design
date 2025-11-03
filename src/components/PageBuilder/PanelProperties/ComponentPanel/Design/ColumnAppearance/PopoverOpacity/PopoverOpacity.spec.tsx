import { noop } from 'lodash';

// components
import PopoverOpacity from './PopoverOpacity';
import { UITools } from 'shared';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverOpacity snapshots', () => {
  it('should render PopoverOpacity', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverOpacity isMixed={false} type="fixed" value="100" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverOpacity isMixed type="fixed" value="100" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
