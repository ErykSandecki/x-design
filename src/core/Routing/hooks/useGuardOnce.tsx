import { useState } from 'react';

export type TUseGuardOnce = boolean;

export const useGuardOnce = (
  callback: () => { before?: () => void; condition: boolean; done: boolean },
): TUseGuardOnce => {
  const [isPending, setIsPending] = useState(true);
  const { before, condition, done } = callback();

  if (isPending && before) {
    before();
  }

  if (done && isPending) {
    setIsPending(false);
  }

  return isPending || condition;
};
