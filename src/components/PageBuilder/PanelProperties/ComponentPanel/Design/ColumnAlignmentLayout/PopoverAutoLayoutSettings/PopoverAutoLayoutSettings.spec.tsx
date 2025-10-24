import { noop } from 'lodash';

// components
import PopoverAutoLayoutSettings from './PopoverAutoLayoutSettings';
import { UITools } from 'shared';

// mocks
import { layoutMock } from 'test/mocks/reducer/pageBuilderMock';

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
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverAutoLayoutSettings isMixedBoxSizing={false} layout={layoutMock} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
