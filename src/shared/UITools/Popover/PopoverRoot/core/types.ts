export type TPreviewData = {
  activeOption: string;
  previewId: string;
  setActiveOption: TFunc<[string]>;
  setPreviewId: TFunc<[string]>;
};

export type TContext = TPreviewData & {
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};
