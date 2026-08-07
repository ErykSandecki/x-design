import { noop } from 'lodash';

// components
import PopoverGap from './PopoverGap';
import { UITools } from 'shared';

// mocks
import { gapMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: vi.fn(),
}));

describe('PopoverGap snapshots', () => {
  it('should render PopoverGap', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverGap gapKey="column" gap={gapMock} isMixed={false} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverGap gapKey="column" gap={gapMock} isMixed />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
