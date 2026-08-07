import { noop } from 'lodash';

// components
import PopoverBorderRadius from './PopoverBorderRadius';
import { UITools } from 'shared';

// utils
import { customRender } from 'test';

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: vi.fn(),
}));

describe('PopoverBorderRadius snapshots', () => {
  it('should render PopoverBorderRadius', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverBorderRadius isMixed={false} mode="fixed" value="100" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverBorderRadius isMixed mode="fixed" value="100" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
