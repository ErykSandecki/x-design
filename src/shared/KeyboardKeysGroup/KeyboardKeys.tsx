import { FC, Fragment } from 'react';

// types
import { TKeyboardShortcuts } from 'types';

// utils
import { mapPrimaryKey } from './utils/mapPrimaryKey';
import { mapSecondaryKey } from './utils/mapSecondaryKey';

export type TKeyboardKeysProps = {
  keyboardShortcuts: TKeyboardShortcuts;
};

export const KeyboardKeys: FC<TKeyboardKeysProps> = ({ keyboardShortcuts: { primaryKeys, secondaryKey } }) => (
  <>
    {primaryKeys?.map((primaryKey, index) => <Fragment key={index}>{mapPrimaryKey(primaryKey)}</Fragment>)}
    {mapSecondaryKey(secondaryKey)}
  </>
);

export default KeyboardKeys;
