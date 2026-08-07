import { noop } from 'lodash';

// components
import HeightPopoverHeight from './HeightPopoverHeight';
import { UITools } from 'shared';

// mocks
import { valueExtendMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: vi.fn(),
}));

describe('HeightPopoverHeight snapshots', () => {
  it('should render HeightPopoverHeight{max}', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <HeightPopoverHeight score={valueExtendMock} scoreKey="max" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeightPopoverHeight{min}', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <HeightPopoverHeight score={valueExtendMock} scoreKey="min" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
