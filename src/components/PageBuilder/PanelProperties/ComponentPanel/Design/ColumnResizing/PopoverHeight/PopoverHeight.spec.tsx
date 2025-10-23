import { noop } from 'lodash';

// components
import PopoverHeight from './PopoverHeight';
import { UITools } from 'shared';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverHeight snapshots', () => {
  it('should render PopoverHeight', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverHeight height={elementMock.height} isMixed={false} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverHeight height={elementMock.width} isMixed />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
