import { FC } from 'react';
import { kebabCase } from 'lodash';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useTransformAreaEvents } from './hooks/useTransformAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// types
import { AnchorResize } from 'store/pageBuilder/enums';
import { E2EAttribute, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// styles
import styles from './transform-area.scss';

// utils
import { enumToArray } from 'utils';

export type TResizeAreaProps = {
  height: TElement['height'];
  id: TElement['id'];
  moseMode: MouseMode;
  width: TElement['width'];
  x: TElement['coordinates']['x'];
  y: TElement['coordinates']['y'];
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
    <div
      className={cx(classNamesWithTheme[className])}
      style={{ height, width }}
    >
      {enumToArray(AnchorResize).map((anchor) => (
        <E2EDataAttribute
          key={anchor as keyof typeof AnchorResize}
          type={E2EAttribute.anchor}
          value={kebabCase(anchor as string)}
        >
          <div
            className={cx(
              classNamesWithTheme.anchorResize.name,
              classNamesWithTheme.anchorResize.modificators[
                anchor as keyof typeof AnchorResize
              ],
            )}
            onMouseDown={(event) =>
              events.onMouseDown(anchor as AnchorResize, event)
            }
          />
        </E2EDataAttribute>
      ))}
    </div>
  );
};

export default TransformArea;
