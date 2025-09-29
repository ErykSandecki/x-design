import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
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

const Elements: FC<TElementsProps> = ({ eventsDisabled, mouseMode, parentId }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const staticData = useSelector(filtredStaticDataSelectorCreator(parentId));

  return staticData.data.map(({ id, type }, index) => {
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
  });
};

export default memo(Elements);
