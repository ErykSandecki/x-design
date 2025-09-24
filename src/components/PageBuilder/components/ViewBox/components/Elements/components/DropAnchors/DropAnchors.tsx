import { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useDropAnchorsEvents } from './hooks/useDropAnchorsEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { HORIZONTAL_ANCHORS, VERTICAL_ANCHORS } from './constants';

// store
import {
  eventSelectorCreator,
  isDraggableSelectorCreator,
} from 'store/pageBuilder/selectors';

// styles
import styles from './drop-anchors.scss';

// types
import { DropAnchorsPosition } from './enums';
import { E2EAttribute, LayoutType, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

// utils
import { enumToArray } from 'utils';

export type TDropAnchorsProps = {
  children: ReactNode;
  id: TElement['id'];
  index: number;
  mouseMode: MouseMode;
  layoutParent: TElement['layout'];
  parentId: TElement['parentId'];
};

const DropAnchors: FC<TDropAnchorsProps> = ({
  children,
  id,
  index,
  mouseMode,
  layoutParent,
  parentId,
}) => {
  const { type } = layoutParent;
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onMouseEnter, ...events } = useDropAnchorsEvents(index, mouseMode);
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
  const isVertical =
    type === LayoutType.default || type === LayoutType.vertical;
  const dropAnchorsPosition = isVertical
    ? VERTICAL_ANCHORS
    : HORIZONTAL_ANCHORS;

  return (
    <div className={cx(classNamesWithTheme[className])}>
      {displayPrevPrompt && (
        <div
          className={cx(
            classNamesWithTheme.prompt.name,
            [classNamesWithTheme.prompt.modificators.top, isVertical],
            [classNamesWithTheme.prompt.modificators.left, !isVertical],
          )}
        />
      )}
      {children}
      {displayNextPrompt && (
        <div
          className={cx(
            classNamesWithTheme.prompt.name,
            [classNamesWithTheme.prompt.modificators.bottom, isVertical],
            [classNamesWithTheme.prompt.modificators.right, !isVertical],
          )}
        />
      )}
      {enumToArray(DropAnchorsPosition)
        .filter((dropAnchor) =>
          dropAnchorsPosition.includes(dropAnchor as DropAnchorsPosition),
        )
        .map((position) => (
          <E2EDataAttribute
            key={position as keyof typeof DropAnchorsPosition}
            type={E2EAttribute.anchor}
            value={position as string}
          >
            <div
              className={cx(
                classNamesWithTheme.anchor.name,
                classNamesWithTheme.anchor.modificators[
                  position as keyof typeof DropAnchorsPosition
                ],
              )}
              onMouseEnter={() =>
                onMouseEnter(
                  DropAnchorsPosition[
                    position as keyof typeof DropAnchorsPosition
                  ],
                )
              }
              {...events}
            />
          </E2EDataAttribute>
        ))}
    </div>
  );
};

export default DropAnchors;
