import { useEffect, useRef, useState } from 'react';

// types
import { HTMLContainerId } from '../../types';

// utils
import { isJestRunning } from 'utils';

export type TUseRenderContainer = HTMLElement;

export const useRenderContainer = (customId: string, htmlContainerId?: HTMLContainerId): HTMLElement | null => {
  const maxNumberOfTries = 10;
  const timeout = useRef<number | null>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const tryFindContainer = (numberOfTries = 0): void => {
    if (numberOfTries <= maxNumberOfTries) {
      const container = document.getElementById(customId);

      if (container) {
        setContainer(container);
      } else {
        timeout.current = window.setTimeout(() => {
          tryFindContainer(numberOfTries + 1);
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (customId && !isJestRunning()) {
      tryFindContainer();
    } else {
      setContainer(document.getElementById(htmlContainerId!));
    }

    return (): void => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return container;
};
