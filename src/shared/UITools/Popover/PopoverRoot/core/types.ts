export type TPreviewData = {
  activeOption: string;
  previewId: string;
  setActiveOption: TFunc<[string]>;
  setPreviewIdHandler: TFunc<[string, string]>;
};

export type TContext = TPreviewData & {
  selected: boolean;
  setSelected: TFunc<[boolean]>;
};
