// components
import DraggableSectionMenu from './DraggableSectionMenu';

// utils
import { customRender } from 'test';

describe('DraggableSection snapshots', () => {
  it('should render DraggableSection', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionMenu forceDisplay={false} show />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when force display', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionMenu forceDisplay show />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render', () => {
    // before
    const { asFragment } = customRender(<DraggableSectionMenu forceDisplay={false} show={false} />);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
