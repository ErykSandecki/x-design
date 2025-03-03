import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import Frame from './components/Frame/Frame';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// store
import { staticDataSelector } from 'store/pageBuilder/selectors';

// styles
import styles from './elements.scss';

// types
import { ElementType } from 'types';

export type TElementsProps = {
  isFrameDraggable: boolean;
};

const Elements: FC<TElementsProps> = ({ isFrameDraggable }) => {
  const staticData = useSelector(staticDataSelector);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return staticData.map(({ id, type }) => {
    switch (type) {
      case ElementType.frame:
        return (
          <Frame
            className={cx(classNamesWithTheme[className].name, [
              classNamesWithTheme[className].modificators.frameDraggable,
              isFrameDraggable,
            ])}
            id={id}
          />
        );
      default:
        return <></>;
    }
  });
};

export default memo(Elements);
