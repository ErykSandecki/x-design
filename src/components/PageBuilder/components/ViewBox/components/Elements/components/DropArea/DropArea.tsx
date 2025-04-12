import { FC, ReactNode, useMemo } from 'react';

// hooks
import { useDropAreaEvents } from './hooks/useDropAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './drop-area.scss';

// types
import { DropAreaPosition } from './enums';
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

// utils
import { enumToArray } from 'utils';
import { useSelector } from 'react-redux';
import {
  eventSelectorCreator,
  eventsSelector,
} from 'store/pageBuilder/selectors';

export type TDropAreaProps = {
  children: ReactNode;
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const DropArea: FC<TDropAreaProps> = ({
  children,
  index,
  mouseMode,
  parentId,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseEnter, ...events } = useDropAreaEvents(index, mouseMode);
  const possibleIndexPosition = useSelector(
    eventSelectorCreator('possibleIndexPosition'),
  ) as number;
  const possibleParent = useSelector(eventSelectorCreator('possibleParent'));
  const isParent = possibleParent === parentId;
  const displayPrevArea =
    isParent && index === 0 && possibleIndexPosition === index;
  const displayNextArea = isParent && possibleIndexPosition - 1 === index;

  return (
    <div className={cx(classNamesWithTheme[className])}>
      {displayPrevArea && <div className={cx(classNamesWithTheme.area)} />}
      {children}
      {displayNextArea && <div className={cx(classNamesWithTheme.area)} />}
      {enumToArray(DropAreaPosition).map((position) => (
        <div
          className={cx(
            classNamesWithTheme.anchor.name,
            classNamesWithTheme.anchor.modificators[
              position as keyof typeof DropAreaPosition
            ],
          )}
          key={position as keyof typeof DropAreaPosition}
          onMouseEnter={() =>
            onMouseEnter(
              DropAreaPosition[position as keyof typeof DropAreaPosition],
            )
          }
          {...events}
        />
      ))}
    </div>
  );
};

export default DropArea;
