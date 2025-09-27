// types
import { TKeysMap } from '../types';

// utils
import { handleLockBrowserEvents } from './handleLockBrowserEvents';

export const getPressedKeys = ({
  altKey,
  ctrlKey,
  metaKey,
  shiftKey,
}: KeyboardEvent | React.KeyboardEvent<HTMLElement>): number =>
  [altKey, ctrlKey, metaKey, shiftKey].filter(Boolean).length;

export const triggerActions = (
  event: KeyboardEvent | React.KeyboardEvent<HTMLElement>,
  keysMap: TKeysMap,
  lockBrowserEvents: boolean,
): void => {
  const { key } = event;

  keysMap.forEach(({ action, anyKey = false, conditions = [], primaryKeys = [], secondaryKey }) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = event;
    const primaryKeysLength = getPressedKeys(event);
    const withAlt = primaryKeys.includes('alt' as never);
    const withControl = primaryKeys.includes('control' as never);
    const withMeta = primaryKeys.includes('meta' as never);
    const withShift = primaryKeys.includes('shift' as never);

    if (lockBrowserEvents) {
      handleLockBrowserEvents(ctrlKey || metaKey, event, key);
    }

    if (
      anyKey ||
      (key.toLowerCase() === secondaryKey.toLowerCase() &&
        primaryKeysLength === primaryKeys.length &&
        (!withAlt || altKey) &&
        (!withControl || ctrlKey) &&
        (!withMeta || metaKey) &&
        (!withShift || shiftKey) &&
        conditions.every(Boolean))
    ) {
      action(event, key);
    }
  });
};
