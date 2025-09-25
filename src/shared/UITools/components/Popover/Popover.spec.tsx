import { fireEvent, render } from '@testing-library/react';
import { RefObject } from 'react';

// components
import Popover from './Popover';

// types
import { E2EAttribute } from 'types';
import { TPopover } from './types';

// utils
import { createHtmlElement } from 'utils';
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();
const refItem = { current: createHtmlElement('div') } as RefObject<HTMLElement>;
const data: TPopover['data'] = [
  { icon: 'AlignHorizontalCenter', text: 'text' },
  { icon: 'AlignHorizontalCenter', selected: true, text: 'text' },
  { separator: true },
];

describe('Popover snapshots', () => {
  it('should render Popover', () => {
    // before
    const { asFragment } = render(
      <Popover
        e2eValue="popover"
        popover={{ data: data }}
        refItem={refItem}
        selected={false}
        setSelected={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render selected', () => {
    // before
    const { asFragment } = render(
      <Popover
        e2eValue="popover"
        popover={{ data: data }}
        refItem={refItem}
        selected
        setSelected={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Popover behaviors', () => {
  it('should click item', () => {
    // before
    const { container } = render(
      <Popover
        e2eValue="popover"
        popover={{ data: data }}
        refItem={refItem}
        selected={false}
        setSelected={mockCallBack}
      />,
    );

    // find
    const item = getByE2EAttribute(container, E2EAttribute.popoverItem, 0);

    // action
    fireEvent.click(item);

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(false);
  });
});
