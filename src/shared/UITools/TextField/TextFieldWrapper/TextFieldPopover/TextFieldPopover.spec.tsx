import { fireEvent } from '@testing-library/react';
import { RefObject } from 'react';

// components
import TextFieldPopover from './TextFieldPopover';

// types
import { E2EAttribute } from 'types';

// utils
import { createHtmlElement } from 'utils';
import { customRender, getByE2EAttribute } from 'test';

const id = 'id';
const element = createHtmlElement('div', { id });
const mockCallBack = jest.fn();
const ref = { current: null } as unknown as RefObject<HTMLInputElement>;

describe('TextFieldPopover snapshots', () => {
  beforeAll(() => {
    // mock
    document.body.appendChild(element);
  });

  it('should render TextFieldPopover', () => {
    // before
    const { asFragment } = customRender(
      <TextFieldPopover
        attachedValue={false}
        classNameIcon="classNameIcon"
        onClick={mockCallBack}
        ref={ref}
        selected={false}
        setSelected={mockCallBack}
      >
        children
      </TextFieldPopover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when attached value', () => {
    // before
    const { asFragment } = customRender(
      <TextFieldPopover
        attachedValue
        classNameIcon="classNameIcon"
        onClick={mockCallBack}
        ref={ref}
        selected={false}
        setSelected={mockCallBack}
      >
        children
      </TextFieldPopover>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with opened popover', () => {
    // before
    const { asFragment, container } = customRender(
      <TextFieldPopover
        attachedValue={false}
        classNameIcon="classNameIcon"
        onClick={mockCallBack}
        ref={ref}
        selected={true}
        setSelected={mockCallBack}
      >
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
