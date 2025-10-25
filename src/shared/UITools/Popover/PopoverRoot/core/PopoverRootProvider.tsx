import { createContext, useContext, FC, ReactNode, useMemo, useState } from 'react';

// types
import { TContext, TPreviewData } from './types';

const PopoverRootContent: React.Context<TContext> = createContext(null);

export const usePopoverRoot = (): TContext => useContext(PopoverRootContent);

export type TPopoverRootProvider = {
  activeOption?: TPreviewData['activeOption'];
  children: ReactNode;
  previewId?: TPreviewData['previewId'];
  selected: boolean;
  setSelected: TContext['setSelected'];
};

export const PopoverRootProvider: FC<TPopoverRootProvider> = ({
  activeOption: initialActiveOption = '',
  children,
  previewId: initialPreviewId = '',
  selected,
  setSelected,
}) => {
  const [activeOption, setActiveOption] = useState(initialActiveOption);
  const [previewId, setPreviewId] = useState(initialPreviewId);

  const setPreviewIdHandler = (
    activeOption: TPreviewData['activeOption'],
    previewId: TPreviewData['previewId'],
  ): void => {
    setActiveOption(activeOption);
    setPreviewId(previewId);
  };

  const value = useMemo(
    () => ({
      activeOption,
      previewId,
      selected,
      setActiveOption,
      setPreviewIdHandler,
      setSelected,
    }),
    [activeOption, previewId, selected],
  );

  return <PopoverRootContent.Provider value={value}>{children}</PopoverRootContent.Provider>;
};
