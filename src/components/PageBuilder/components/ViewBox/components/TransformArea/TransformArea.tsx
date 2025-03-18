import { FC } from 'react';

// hooks
import { useTransformAreaEvents } from './hooks/useTransformAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// types
import { Anchor } from 'store/pageBuilder/enums';
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

// styles
import styles from './transform-area.scss';

// utils
import { enumToArray } from 'utils';

export type TResizeAreaProps = {
  height: TElement['height'];
  id: TElement['id'];
  moseMode: MouseMode;
  width: TElement['width'];
  x: TElement['positionAbsolute']['x'];
  y: TElement['positionAbsolute']['y'];
};

const TransformArea: FC<TResizeAreaProps> = ({
  height,
  id,
  moseMode,
  width,
  x,
  y,
}) => {
  const events = useTransformAreaEvents(height, id, moseMode, width, x, y);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div className={cx(classNamesWithTheme[className])}>
      {enumToArray(Anchor).map((anchor) => (
        <div
          className={cx(
            classNamesWithTheme.anchor.name,
            classNamesWithTheme.anchor.modificators[
              anchor as keyof typeof Anchor
            ],
          )}
          key={anchor as keyof typeof Anchor}
          onMouseDown={(event) => events.onMouseDown(anchor as Anchor, event)}
        />
      ))}
    </div>
  );
};

export default TransformArea;
