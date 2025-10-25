import { FC, ReactNode } from 'react';

// core
import { usePopoverRoot } from '../../PopoverRoot/core/PopoverRootProvider';

// types
import { TPreviewData } from '../../PopoverRoot/core/types';

export type TPopoverPreviewItemProps = {
  children: (activeOption: TPreviewData['activeOption']) => ReactNode;
  id: string;
};

export const PopoverPreviewItem: FC<TPopoverPreviewItemProps> = ({ children, id }) => {
  const { activeOption, previewId } = usePopoverRoot();

  return previewId === id ? children(activeOption) : null;
};

export default PopoverPreviewItem;
