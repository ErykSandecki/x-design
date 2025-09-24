import { FC, memo, ReactNode } from 'react';
import { useSelector } from 'react-redux';

// components
import DropAnchors from './components/DropAnchors/DropAnchors';

// store
import { elementAttributeSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { MouseMode, TElement } from 'types';

export type TElementWrapperProps = {
  children: ReactNode;
  id: TElement['id'];
  isSelected: boolean;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const ElementWrapper: FC<TElementWrapperProps> = ({
  children,
  id,
  isSelected,
  mouseMode,
  parentId,
}) => {
  const position = useSelector(elementAttributeSelectorCreator('position', id));

  if (!isSelected && position === 'relative') {
    return (
      <DropAnchors id={id} mouseMode={mouseMode} parentId={parentId}>
        {children}
      </DropAnchors>
    );
  }

  return children;
};

export default memo(ElementWrapper);
