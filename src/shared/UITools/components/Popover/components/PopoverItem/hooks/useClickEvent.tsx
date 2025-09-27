export type TUseClickEvent = TFunc;

export const useClickEvent = (onClick: TFunc | undefined, setSelected: TFunc<[boolean]>): TUseClickEvent => {
  const handleClick = (): void => {
    onClick?.();
    setSelected(false);
  };

  return handleClick;
};
