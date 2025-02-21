import { isMacOs } from 'react-device-detect';

// types
import { TPrimaryKey } from 'hooks';

export const APPLICATION_NAME = 'R|X /Architect';

export const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const CONTROL = isMacOs
  ? ('meta' as TPrimaryKey)
  : ('control' as TPrimaryKey);

export const CURSOR_STATES = ['idle', 'lmb', 'mmb', 'unknown', 'rmb'] as const;

export const DATE_FORMAT = 'DD-MM-YYYY';
export const DATE_FORMAT_HOURS_MINUTES = 'DD-MM-YYYY HH:mm';
export const DATE_FORMAT_HOURS_MINUTES_SECONDS = 'DD-MM-YYYY HH:mm:ss';

export const DATE_FORMATS = [
  DATE_FORMAT,
  DATE_FORMAT_HOURS_MINUTES,
  DATE_FORMAT_HOURS_MINUTES_SECONDS,
] as const;

export const ROWS_PER_PAGE = [5, 25, 50, 100] as const;
