import { FC, memo } from 'react';

// components
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './clickable-shadow-area.scss';

// types
import { TElement } from 'types';

type TClickableShadowAreaProps = {
  height: TElement['height'];
  width: TElement['width'];
};

const ClickableShadowArea: FC<TClickableShadowAreaProps> = ({
  height,
  width,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name),
      }}
      style={{ height, width }}
    />
  );
};

export default memo(ClickableShadowArea);
