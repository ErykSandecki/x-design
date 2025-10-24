import { FC, ReactNode } from 'react';

// core
import { PopoverRootProvider } from './core/PopoverRootProvider';

// types
import { TContext } from './core/types';

export type TPopoverRootProps = TContext & {
  children: ReactNode;
};

export const PopoverRoot: FC<TPopoverRootProps> = ({ children, selected, setSelected }) => (
  <PopoverRootProvider selected={selected} setSelected={setSelected}>
    {children}
  </PopoverRootProvider>
);

export default PopoverRoot;
