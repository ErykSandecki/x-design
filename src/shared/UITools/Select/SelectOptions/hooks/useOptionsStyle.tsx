import { RefObject, useState, useEffect, CSSProperties } from 'react';

export type TUseOptionsStyle = Pick<CSSProperties, 'left' | 'top' | 'width'>;

export const useOptionsStyle = (
  optionsRef: RefObject<HTMLDivElement>,
  selected: boolean,
  value: string | Array<string>,
  wrapperRef: RefObject<HTMLDivElement>,
): TUseOptionsStyle => {
  const [style, setStyle] = useState<CSSProperties>({});
  const height = wrapperRef.current ? getComputedStyle(wrapperRef.current).height : 0;

  const calculateOptionsPosition = (): void => {
    if (optionsRef.current && wrapperRef.current) {
      const { height } = optionsRef.current!.getBoundingClientRect();
      const { innerHeight } = window;
      const { width, x, y } = wrapperRef.current.getBoundingClientRect();
      const inputHeight = 24;
      const marginBottom = 10;
      const top = `${y + inputHeight}px`;
      const totalHeight = height + inputHeight + marginBottom;

      if (y + totalHeight > innerHeight) {
        setStyle({
          bottom: 10,
          left: `${x}px`,
          width,
        });
      } else {
        setStyle({
          left: `${x}px`,
          top,
          width,
        });
      }
    }
  };

  useEffect(() => {
    calculateOptionsPosition();
  }, [height, selected, value]);

  return style;
};
