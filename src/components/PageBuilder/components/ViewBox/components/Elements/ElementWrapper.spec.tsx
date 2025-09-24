import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

// components
import ElementWrapper from './ElementWrapper';

// types
import { MouseMode } from 'types/enums/mouseMode';

jest.mock('./components/DropAnchors/DropAnchors', () => ({ children }) => (
  <div className="drop-anchors">{children}</div>
));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('ElementWrapper snapshots', () => {
  it('should render ElementWrapper', () => {
    // mock
    (useSelector as unknown as jest.Mock).mockImplementation(() => 'absolute');

    // before
    const { asFragment } = render(
      <ElementWrapper
        id="-1"
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
      >
        children
      </ElementWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with drop anchors', () => {
    // mock
    (useSelector as unknown as jest.Mock).mockImplementation(() => 'relative');

    // before
    const { asFragment } = render(
      <ElementWrapper
        id="-1"
        isSelected={false}
        mouseMode={MouseMode.default}
        parentId="-1"
      >
        children
      </ElementWrapper>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
