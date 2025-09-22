import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import ElementWrapper from './ElementWrapper';
import Frame from './components/Frame/Frame';

// hooks
import { useTheme } from 'hooks';

// others
import { classNames } from './classNames';

// store
import { filtredStaticDataSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './elements.scss';

// types
import { ElementType, TElement } from 'types';
import { MouseMode } from 'types/enums/mouseMode';

export type TElementsProps = {
  eventsDisabled: boolean;
  isSelected?: boolean;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const Elements: FC<TElementsProps> = ({
  eventsDisabled,
  isSelected = false,
  mouseMode,
  parentId,
}) => {
  const staticData = useSelector(filtredStaticDataSelectorCreator(parentId));
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return staticData.map(({ id, parentId, type }, index) => {
    switch (type) {
      case ElementType.frame:
        return (
          <ElementWrapper
            id={id}
            index={index}
            isSelected={isSelected}
            key={id}
            mouseMode={mouseMode}
            parentId={parentId}
          >
            <Frame
              className={cx(classNamesWithTheme.element.name, [
                classNamesWithTheme.element.modificators.eventsDisabled,
                eventsDisabled,
              ])}
              id={id}
              mouseMode={mouseMode}
              parentId={parentId}
              type={type}
            />
          </ElementWrapper>
        );
      default:
        return <></>;
    }
  });
};

export default memo(Elements);
