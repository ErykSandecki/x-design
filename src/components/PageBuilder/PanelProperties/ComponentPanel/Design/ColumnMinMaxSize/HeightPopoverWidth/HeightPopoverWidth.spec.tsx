import { noop } from 'lodash';

// components
import HeightPopoverWidth from './HeightPopoverWidth';
import { UITools } from 'shared';

// mocks
import { valueExtendMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

vi.mock('react-redux', async (importOriginal) => ({
  ...(await importOriginal()),
  useDispatch: vi.fn(),
}));

describe('HeightPopoverWidth snapshots', () => {
  it('should render HeightPopoverWidth{max}', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <HeightPopoverWidth score={valueExtendMock} scoreKey="max" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeightPopoverWidth{min}', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <HeightPopoverWidth score={valueExtendMock} scoreKey="min" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
