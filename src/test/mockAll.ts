// types
import { TObject } from 'types';
import type { Mock } from 'vitest';

export const mockAll = async (importOriginal: () => Promise<unknown>): Promise<TObject<Mock>> => {
  const obj = await importOriginal();
  const { mapValues } = await vi.importActual<typeof import('lodash')>('lodash');

  return mapValues(obj as object, () => vi.fn()) as TObject<Mock>;
};
