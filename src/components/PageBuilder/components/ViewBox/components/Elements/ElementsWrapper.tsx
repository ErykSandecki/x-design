import { FC, memo, ReactNode } from 'react';

// components
import DropAnchors from './components/DropAnchors/DropAnchors';

// types
import { MouseMode, TElement } from 'types';

export type TElementsWrapperProps = {
  children: ReactNode;
  id: TElement['id'];
  index: number;
  isSelected: boolean;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
  position: TElement['position'];
};

const ElementsWrapper: FC<TElementsWrapperProps> = ({
  children,
  id,
  index,
  isSelected,
  mouseMode,
  parentId,
  position,
}) => {
  if (!isSelected && position) {
    return (
      <DropAnchors
        id={id}
        index={index}
        mouseMode={mouseMode}
        parentId={parentId}
      >
        {children}
      </DropAnchors>
    );
  }

  return children;
};

export default memo(ElementsWrapper);
