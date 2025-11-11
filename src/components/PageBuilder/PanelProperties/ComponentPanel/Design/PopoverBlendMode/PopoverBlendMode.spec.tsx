import { noop } from 'lodash';

// components
import PopoverBlendMode from './PopoverBlendMode';
import { UITools } from 'shared';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverBlendMode snapshots', () => {
  it('should render PopoverBlendMode', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverBlendMode mixdBlendMode="initial" isMixed={false} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverBlendMode mixdBlendMode="initial" isMixed />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
