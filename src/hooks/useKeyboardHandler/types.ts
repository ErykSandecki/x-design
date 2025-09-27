import React from 'react';

// types
import { KeyboardKeys } from '../../types/enums';

export type TPrimaryKey = 'alt' | 'control' | 'meta' | 'shift';

export type TKeyMap = {
  action: TFunc<[KeyboardEvent | React.KeyboardEvent<HTMLElement>, string]>;
  anyKey?: boolean;
  conditions?: Array<boolean>;
  primaryKeys?: [] | [TPrimaryKey] | [TPrimaryKey, TPrimaryKey] | [TPrimaryKey, TPrimaryKey, TPrimaryKey];
  secondaryKey: KeyboardKeys;
};

export type TKeysMap = Array<TKeyMap>;
