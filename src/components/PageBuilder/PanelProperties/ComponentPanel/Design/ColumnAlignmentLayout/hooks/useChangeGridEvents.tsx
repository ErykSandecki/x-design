export type TUseChangeGridEvents = {
  onChangeColumns: TFunc<[string, boolean?]>;
  onChangeRows: TFunc<[string, boolean?]>;
};

export const useChangeGridEvents = (setColumns: TFunc<[string]>, setRows: TFunc<[string]>): TUseChangeGridEvents => {
  const handleChangeColumns = (value: string): void => {
    setColumns(value);
  };

  const handleChangeRows = (value: string): void => {
    setRows(value);
  };

  return {
    onChangeColumns: handleChangeColumns,
    onChangeRows: handleChangeRows,
  };
};
