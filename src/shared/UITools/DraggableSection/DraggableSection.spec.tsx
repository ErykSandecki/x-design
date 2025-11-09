import { fireEvent } from '@testing-library/react';

// components
import DraggableSection from './DraggableSection';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

const mockCallBack = jest.fn();

jest.mock('./hooks/useDraggableSectionEvents', () => ({
  useDraggableSectionEvents: (): any => ({
    draggableItem: -1,
    isDraggable: false,
    isPressing: true,
    onMouseDown: mockCallBack,
    selected: false,
    setIsDraggable: mockCallBack,
  }),
}));

describe('DraggableSection snapshots', () => {
  it('should render DraggableSection', () => {
    // before
    const { asFragment } = customRender(
      <DraggableSection onClickRemove={mockCallBack} onClickVisible={mockCallBack} />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render items', () => {
    // before
    const { asFragment } = customRender(
      <DraggableSection
        components={[
          { element: <></>, visible: true },
          { element: <></>, visible: true },
          { element: <></>, visible: true },
        ]}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
      />,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('DraggableSection behaviors', () => {
  it('should trigger draggable item', () => {
    // before
    const { container } = customRender(
      <DraggableSection
        components={[
          { element: <></>, visible: true },
          { element: <></>, visible: true },
          { element: <></>, visible: true },
        ]}
        onClickRemove={mockCallBack}
        onClickVisible={mockCallBack}
      />,
    );

    // action
    fireEvent.mouseDown(getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 2));
    fireEvent.mouseMove(getByE2EAttribute(container, E2EAttribute.draggableSectionItem, 2));

    // result
    expect(mockCallBack.mock.calls[0][0]).toBe(2);
    expect(mockCallBack.mock.calls[1][0]).toBe(true);
  });
});
