// components
import DraggableSectionAnchors from './DraggableSectionAnchors';

// utils
import { customRender } from 'test';

describe('DraggableSectionAnchors snapshots', () => {
  it('should render DraggableSectionAnchors', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchors index={0} isDraggable length={3} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is middle', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchors index={1} isDraggable length={3} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is middle', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchors index={2} isDraggable length={3} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render when lenght is less than 2', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionAnchors index={0} isDraggable length={1} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
