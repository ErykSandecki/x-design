import { fireEvent } from '@testing-library/react';

// components
import DraggableSectionContent from './DraggableSectionContent';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

describe('DraggableSectionContent snapshots', () => {
  it('should render DraggableSectionContent', () => {
    // before
    const { asFragment } = customRender(
      <DraggableSectionContent
        element={<></>}
        index={0}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
        visible
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when is not visible param', () => {
    // before
    const { asFragment } = customRender(
      <DraggableSectionContent
        element={<></>}
        index={0}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
        visible={false}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('DraggableSectionContent behaviors', () => {
  it('should toggle visible', () => {
    // before
    const { container } = customRender(
      <DraggableSectionContent
        element={<></>}
        index={0}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
        visible
      />,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'toggle-visibility'));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(0);
  });

  it('should trigger remove element', () => {
    // before
    const { container } = customRender(
      <DraggableSectionContent
        element={<></>}
        index={0}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
        visible
      />,
    );

    // action
    fireEvent.click(getByE2EAttribute(container, E2EAttribute.buttonIcon, 'remove'));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(0);
  });
});
