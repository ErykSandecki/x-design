import { FC, ReactNode } from 'react';

// components
import { E2EDataAttribute } from 'shared';

// hooks
import { useDropAnchorsEvents } from './hooks/useDropAnchorsEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
import { HORIZONTAL_ANCHORS, promptsData, VERTICAL_ANCHORS } from './constants';

// styles
import styles from './drop-anchors.scss';

// types
import { DropAnchorsPosition } from 'store/pageBuilder/enums';
import { E2EAttribute, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

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
  const {
    anchorPos,
    displayNextPrompt,
    displayPrevPrompt,
    isFlowVertical,
    isGrid,
    onMouseEnter,
    ...events
  } = useDropAnchorsEvents(id, index, mouseMode, parentId);
  const dropAnchorsPosition = isFlowVertical
    ? VERTICAL_ANCHORS
    : HORIZONTAL_ANCHORS;

  return (
    <div className={cx(classNamesWithTheme[className])}>
      {promptsData(
        anchorPos,
        displayNextPrompt,
        displayPrevPrompt,
        isFlowVertical,
        isGrid,
      ).map(({ key, visible }) => (
        <div
          className={cx(classNamesWithTheme.prompt.name, [
            classNamesWithTheme.prompt.modificators[key],
            visible,
          ])}
          key={key}
        />
      ))}
      {children}
      {enumToArray(DropAnchorsPosition)
        .filter(
          (dropAnchor) =>
            isGrid ||
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
