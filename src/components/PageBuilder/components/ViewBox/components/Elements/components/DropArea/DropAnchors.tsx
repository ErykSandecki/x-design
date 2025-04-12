import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useDropAreaEvents } from './hooks/useDropAreaEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// store
import {
  eventSelectorCreator,
  isDraggableSelectorCreator,
} from 'store/pageBuilder/selectors';

// styles
import styles from './drop-anchors.scss';

// types
import { DropAreaPosition } from './enums';
import { MouseMode } from 'components/PageBuilder/enums';
import { TElement } from 'types';

// utils
import { enumToArray } from 'utils';

export type TDropAnchorsProps = {
  children: ReactNode;
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const DropAnchors: FC<TDropAnchorsProps> = ({
  children,
  id,
  index,
  mouseMode,
  parentId,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseEnter, ...events } = useDropAreaEvents(index, mouseMode);
  const isDraggable = useSelector(isDraggableSelectorCreator(id));
  const possibleIndexPosition = useSelector(
    eventSelectorCreator('possibleIndexPosition'),
  ) as number;
  const possibleParent = useSelector(eventSelectorCreator('possibleParent'));
  const isFirst = index === 0;
  const isParent = possibleParent === parentId;
  const displayPrevPrompt =
    !isDraggable && isParent && isFirst && possibleIndexPosition === index;
  const displayNextPrompt =
    !isDraggable && isParent && possibleIndexPosition - 1 === index;

  return (
    <div className={cx(classNamesWithTheme[className])}>
      {displayPrevPrompt && (
        <div
          className={cx(
            classNamesWithTheme.prompt.name,
            classNamesWithTheme.prompt.modificators.top,
          )}
        />
      )}
      {children}
      {displayNextPrompt && (
        <div
          className={cx(
            classNamesWithTheme.prompt.name,
            classNamesWithTheme.prompt.modificators.bottom,
          )}
        />
      )}
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

export default DropAnchors;
