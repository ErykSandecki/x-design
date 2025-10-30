import { noop } from 'lodash';

// components
import PopoverInsets from './PopoverInsets';
import { UITools } from 'shared';

// others
import { translationNameSpace as paddingTranslationNameSpace } from '../../../PanelProperties/ComponentPanel/Design/ColumnPadding/constants';

// utils
import { customRender } from 'test';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('PopoverGap snapshots', () => {
  it('should render PopoverInsets', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverInsets
          icon="PaddingB"
          insets={['b', 'l', 'r', 't']}
          insetsName="padding"
          isMixed={false}
          translationNameSpace={paddingTranslationNameSpace}
          value="1"
        />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with mixed value', () => {
    // before
    const { asFragment } = customRender(
      <UITools.PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <PopoverInsets
          icon="PaddingB"
          insets={['b', 'l', 'r', 't']}
          insetsName="padding"
          isMixed
          translationNameSpace={paddingTranslationNameSpace}
          value="1"
        />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
