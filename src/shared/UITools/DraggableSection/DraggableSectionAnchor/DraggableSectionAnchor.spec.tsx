import { fireEvent } from '@testing-library/react';

// components
import DraggableSectionAnchor from './DraggableSectionAnchor';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

describe('DraggableSectionAnchor snapshots', () => {
  it('should render DraggableSectionAnchor', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchor e2eValue="e2eValue" index={0} isDraggable={false} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is draggable', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchor e2eValue="e2eValue" index={0} isDraggable />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render prompt when mouse enter', () => {
    // before
    const { asFragment, container } = customRender(
      <DraggableSectionAnchor e2eValue="e2eValue" index={0} isDraggable />,
    );

    // action
    fireEvent.mouseEnter(getByE2EAttribute(container, E2EAttribute.anchor));

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should hide prompt when mouse leave', () => {
    // before
    const { asFragment, container } = customRender(
      <DraggableSectionAnchor e2eValue="e2eValue" index={0} isDraggable />,
    );

    // action
    fireEvent.mouseEnter(getByE2EAttribute(container, E2EAttribute.anchor));
    fireEvent.mouseLeave(getByE2EAttribute(container, E2EAttribute.anchor));

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
