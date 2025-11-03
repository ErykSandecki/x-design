export type TValue = {
  value: number;
};

export type TValueExtended = TValue & {
  mode: 'fixed' | 'variable';
};
