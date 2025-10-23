import { noop } from 'lodash';

// components
import PopoverWidth from './PopoverWidth';
import { UITools } from 'shared';

// mocks
import { elementMock } from 'test/mocks/reducer/pageBuilderMock';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverWidth snapshots', () => {
  it('should render PopoverWidth', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverWidth isMixed={false} width={elementMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <PopoverWidth isMixed width={elementMock.width} />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
