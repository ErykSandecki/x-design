import { RefObject } from 'react';
import { render } from '@testing-library/react';

// components
import Popover from './Popover';

// types
import { TPopover } from './types';

// utils
import { createHtmlElement } from 'utils';

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
