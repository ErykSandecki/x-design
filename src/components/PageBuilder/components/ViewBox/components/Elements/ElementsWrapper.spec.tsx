import { render } from '@testing-library/react';

// components
import ElementsWrapper from './ElementsWrapper';

// types
import { MouseMode } from 'types/enums/mouseMode';

jest.mock('./components/DropAnchors/DropAnchors', () => ({ children }) => (
  <div className="drop-anchors">{children}</div>
));

describe('ElementsWrapper snapshots', () => {
  it('should render ElementsWrapper', () => {
    // before
    const { asFragment } = render(
      <ElementsWrapper
        id="-1"
        index={0}
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
        position="absolute"
      >
        children
      </ElementsWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with drop anchors', () => {
    // before
    const { asFragment } = render(
      <ElementsWrapper
        id="-1"
        index={0}
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
        position="relative"
      >
        children
      </ElementsWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
