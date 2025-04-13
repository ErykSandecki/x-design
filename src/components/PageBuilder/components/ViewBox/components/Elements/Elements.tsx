import { FC, memo } from 'react';
import { useSelector } from 'react-redux';

// components
import DropAnchors from './components/DropAnchors/DropAnchors';
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
import { MouseMode } from 'components/PageBuilder/enums';

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

  return staticData.map(({ id, parentId, position, type }, index) => {
    const Wrapper =
      !isSelected && position === 'relative'
        ? ({ children }) => (
            <DropAnchors
              id={id}
              index={index}
              mouseMode={mouseMode}
              parentId={parentId}
            >
              {children}
            </DropAnchors>
          )
        : ({ children }) => <>{children}</>;

    switch (type) {
      case ElementType.frame:
        return (
          <Wrapper key={id}>
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
          </Wrapper>
        );
      default:
        return <></>;
    }
  });
};

export default memo(Elements);
