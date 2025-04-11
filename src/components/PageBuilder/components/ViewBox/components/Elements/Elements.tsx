import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import Frame from './components/Frame/Frame';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// store
import { filtredStaticDataSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './elements.scss';

// types
import { ElementType, Sort, TElement } from 'types';
import { MouseMode } from 'components/PageBuilder/enums';

// utils
import { objectToArray } from 'utils';
import { sortNumbersByObject } from 'utils/math/sort';

export type TElementsProps = {
  eventsDisabled: boolean;
  mouseMode: MouseMode;
  parentId: TElement['parentId'];
};

const Elements: FC<TElementsProps> = ({
  eventsDisabled,
  mouseMode,
  parentId,
}) => {
  const staticData = useSelector(filtredStaticDataSelectorCreator(parentId));
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return sortNumbersByObject(
    objectToArray(staticData),
    'index',
    Sort.ascent,
  ).map(({ id, parentId, type }) => {
    switch (type) {
      case ElementType.frame:
        return (
          <Frame
            className={cx(classNamesWithTheme[className].name, [
              classNamesWithTheme[className].modificators.eventsDisabled,
              eventsDisabled,
            ])}
            id={id}
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
