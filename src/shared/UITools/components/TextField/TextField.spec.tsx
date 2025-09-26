import { fireEvent, render } from '@testing-library/react';

// components
import TextField from './TextField';
import { PopoverCompound } from '../Popover/Popover';

// types
import { E2EAttribute } from 'types';

// utils
import { createHtmlElement } from 'utils';
import { getByE2EAttribute } from 'test';

const id = 'id';
const element = createHtmlElement('div', { id });

describe('TextField snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(element);
  });

  it('should render TextField', () => {
    // before
    const { asFragment } = render(<TextField />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render wiht popover', () => {
    // before
    const { asFragment } = render(
      <TextField
        idContainer={id}
        popoverChildren={<PopoverCompound.PopoverSeparator />}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment, container } = render(
      <TextField
        idContainer={id}
        popoverChildren={<PopoverCompound.PopoverSeparator />}
      />,
    );

    // find
    const icon = getByE2EAttribute(container, E2EAttribute.icon, 'variant');

    // action
    fireEvent.click(icon);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
