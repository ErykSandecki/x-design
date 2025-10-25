import { FC, ReactNode } from 'react';

// core
import { PopoverRootProvider } from './core/PopoverRootProvider';

// types
import { TContext, TPreviewData } from './core/types';

export type TPopoverRootProps = Omit<TContext, keyof TPreviewData> & {
  activeOption?: TPreviewData['activeOption'];
  children: ReactNode;
  previewId?: TPreviewData['previewId'];
};

export const PopoverRoot: FC<TPopoverRootProps> = ({ children, ...restProps }) => (
  <PopoverRootProvider {...restProps}>{children}</PopoverRootProvider>
);

export default PopoverRoot;
