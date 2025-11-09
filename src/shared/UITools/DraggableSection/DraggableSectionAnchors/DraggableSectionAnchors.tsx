import { FC } from 'react';

// components
import DraggableSectionAnchor from '../DraggableSectionAnchor/DraggableSectionAnchor';

export type TDraggableSectionAnchorsProps = {
  index: number;
  isDraggable: boolean;
  length: number;
};

export const DraggableSectionAnchors: FC<TDraggableSectionAnchorsProps> = ({ index, isDraggable, length }) => {
  if (length < 2) {
    return null;
  }

  return (
    <>
      <DraggableSectionAnchor e2eValue="anchor-north" index={index} isDraggable={isDraggable} />
      <DraggableSectionAnchor e2eValue="anchor-south" index={index} isDraggable={isDraggable} />
    </>
  );
};

export default DraggableSectionAnchors;
