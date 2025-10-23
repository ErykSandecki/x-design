import { noop } from 'lodash';

// components
import PopoverGap from './PopoverGap';
import { UITools } from 'shared';

// mocks
import { gapMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverGap snapshots', () => {
  it('should render PopoverGap', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverGap gap="column" gapProperties={gapMock} isMixed={false} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverGap gap="column" gapProperties={gapMock} isMixed />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
