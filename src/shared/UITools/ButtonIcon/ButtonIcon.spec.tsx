// components
import ButtonIcon from './ButtonIcon';
import { PopoverCompound } from '../Popover/Popover';

// utils
import { createHtmlElement } from 'utils';
import { customRender } from 'test';

const id = 'id';
const element = createHtmlElement('div', { id });

describe('ButtonIcon snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(element);
  });

  it('should render ButtonIcon', () => {
    // before
    const { asFragment } = customRender(<ButtonIcon name="Close" />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is selected', () => {
    // before
    const { asFragment } = customRender(<ButtonIcon name="Close" selected />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with popover', () => {
    // before
    const { asFragment } = customRender(
      <ButtonIcon idContainer={id} name="Close" popoverChildren={<PopoverCompound.PopoverSeparator />} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
