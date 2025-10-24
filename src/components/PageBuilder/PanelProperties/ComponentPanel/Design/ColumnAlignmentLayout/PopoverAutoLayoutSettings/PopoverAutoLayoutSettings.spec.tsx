import { noop } from 'lodash';

// components
import PopoverAutoLayoutSettings from './PopoverAutoLayoutSettings';
import { UITools } from 'shared';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverAutoLayoutSettings snapshots', () => {
  it('should render PopoverAutoLayoutSettings', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverAutoLayoutSettings />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
