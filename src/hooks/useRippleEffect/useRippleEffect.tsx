import cx from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';

// others
import { RIPPLE_EFFECT_MODIFICATOR } from './constants';

// types
import { TObject, Theme } from '../../types';

type TUseRippleEffect = {
  rippleEffect: JSX.Element | null;
  triggerRippleEffect: (event: MouseEvent) => void;
};

export const useRippleEffect = (
  className: string,
  styles: TObject<string>,
  delay = 300,
): TUseRippleEffect => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);

  const rippleEffect = isRippling ? (
    <span
      className={cx(
        styles[`${className}--${RIPPLE_EFFECT_MODIFICATOR}`],
        styles[`${className}--${RIPPLE_EFFECT_MODIFICATOR}--${Theme.light}`],
        styles[`${className}--${RIPPLE_EFFECT_MODIFICATOR}--${Theme.dark}`],
      )}
      style={{
        left: coords.x,
        top: coords.y,
      }}
    />
  ) : null;

  const triggerRippleEffect = (event: MouseEvent): void => {
    const { clientX, clientY, currentTarget } = event;
    const { left, top } = currentTarget.getBoundingClientRect();

    setCoords({
      x: clientX - left,
      y: clientY - top,
    });
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      timeout = setTimeout(() => setIsRippling(false), delay);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [coords]);

  return { rippleEffect, triggerRippleEffect };
};
