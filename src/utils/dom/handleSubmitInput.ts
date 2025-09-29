import { KeyboardEvent } from 'react';

// types
import { KeyboardKeys } from '../../types/enums';

export const handleSubmitInput =
  (key: KeyboardKeys, current: any): TFunc<[KeyboardEvent<HTMLInputElement>]> =>
  (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === key) {
      current?.blur();
    }
  };
