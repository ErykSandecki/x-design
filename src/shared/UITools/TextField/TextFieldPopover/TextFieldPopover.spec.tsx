import { fireEvent } from '@testing-library/react';

// components
import TextFieldPopover from './TextFieldPopover';

// types
import { E2EAttribute } from 'types';

// utils
import { createHtmlElement } from 'utils';
import { customRender, getByE2EAttribute } from 'test';

const id = 'id';
const element = createHtmlElement('div', { id });

describe('TextFieldPopover snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(element);
  });

  it('should render TextFieldPopover', () => {
    // before
    const { asFragment } = customRender(
      <TextFieldPopover classNameIcon="classNameIcon" idContainer="idContainer">
        children
      </TextFieldPopover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment, container } = customRender(
      <TextFieldPopover classNameIcon="classNameIcon" idContainer="idContainer">
        children
      </TextFieldPopover>,
    );

    // find
    const icon = getByE2EAttribute(container, E2EAttribute.icon, 'variant');

    // action
    fireEvent.click(icon);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
