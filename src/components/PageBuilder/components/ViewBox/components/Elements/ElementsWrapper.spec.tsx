import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

// components
import ElementsWrapper from './ElementsWrapper';

// types
import { MouseMode } from 'types/enums/mouseMode';

jest.mock('./components/DropAnchors/DropAnchors', () => ({ children }) => (
  <div className="drop-anchors">{children}</div>
));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('ElementsWrapper snapshots', () => {
  it('should render ElementsWrapper', () => {
    // mock
    (useSelector as unknown as jest.Mock).mockImplementation(() => 'absolute');

    // before
    const { asFragment } = render(
      <ElementsWrapper
        id="-1"
        index={0}
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
      >
        children
      </ElementsWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with drop anchors', () => {
    // mock
    (useSelector as unknown as jest.Mock).mockImplementation(() => 'relative');

    // before
    const { asFragment } = render(
      <ElementsWrapper
        id="-1"
        index={0}
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
      >
        children
      </ElementsWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
