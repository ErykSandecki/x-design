import { fireEvent, render } from '@testing-library/react';

// components
import Anchors from './Anchors';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { E2EAttribute } from 'types';

// utils
import { getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('Prompts snapshots', () => {
  it('should render Prompts', () => {
    // before
    const { asFragment } = render(
      <Anchors isFlowVertical isGrid={false} onMouseEnter={mockCallBack} onMouseLeave={mockCallBack} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render all anchors', () => {
    // before
    const { asFragment } = render(
      <Anchors isFlowVertical={false} isGrid onMouseEnter={mockCallBack} onMouseLeave={mockCallBack} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('DropAnchors behaviors', () => {
  it('should triger event mouse enter', () => {
    // before
    const { container } = render(
      <Anchors isFlowVertical={false} isGrid onMouseEnter={mockCallBack} onMouseLeave={mockCallBack} />,
    );

    // action
    fireEvent.mouseEnter(getByE2EAttribute(container, E2EAttribute.anchor, DropAnchorsPosition.top));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(DropAnchorsPosition.top);
  });

  it('should triger event mouse leave', () => {
    // before
    const { container } = render(
      <Anchors isFlowVertical={false} isGrid onMouseEnter={mockCallBack} onMouseLeave={mockCallBack} />,
    );

    // action
    fireEvent.mouseLeave(getByE2EAttribute(container, E2EAttribute.anchor, DropAnchorsPosition.top));

    // result
    expect(mockCallBack.mock.calls.length).toBe(1);
  });
});
