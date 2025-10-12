import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import Frame from './Frame/Frame';
import PossibleElement from './PossibleElement/PossibleElement';

// hooks
import { useTheme } from 'hooks';

// others
import { classNames } from './classNames';

// store
import { elementAttributeSelectorCreator, hasPossibleElementSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './elements.scss';

// types
import { ElementType, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

export type TElementsProps = {
  eventsDisabled: boolean;
  id: TElement['id'];
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const Elements: FC<TElementsProps> = ({ eventsDisabled, id, mouseMode, parentId }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const children = useSelector(elementAttributeSelectorCreator('children', id));
  const hasPossibleElement = useSelector(hasPossibleElementSelectorCreator(id));

  return (
    <>
      {children.map(({ id, type }, index) => {
        switch (type) {
          case ElementType.frame:
            return (
              <Frame
                className={cx(classNamesWithTheme.element.name, [
                  classNamesWithTheme.element.modificators.eventsDisabled,
                  eventsDisabled,
                ])}
                id={id}
                index={index}
                key={id}
                mouseMode={mouseMode}
                parentId={parentId}
                type={type}
              />
            );
          default:
            return <></>;
        }
      })}
      {hasPossibleElement && <PossibleElement parentId={id} />}
    </>
  );
};

export default memo(Elements);
