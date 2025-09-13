import { createPortal } from 'react-dom';
import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Element from '../Element/Element';
import Elements from '../../Elements';
import { Small } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useTheme } from 'hooks';

// others
import { className as classNameFrame, classNames } from './classNames';
import { translationNameSpace } from './contants';

// styles
import styles from './frame.scss';

// types
import { TElementProps } from '../../types';

export type TFrameProps = TElementProps;

const Frame: FC<TFrameProps> = ({
  className,
  id,
  mouseMode,
  parentId,
  type,
}) => {
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Element
      classes={{
        className: cx(className, classNamesWithTheme[classNameFrame]),
      }}
      id={id}
      parentId={parentId}
      mouseMode={mouseMode}
      type={type}
    >
      {(coordinates, hover, selected) => (
        <>
          {overlayContainerRef.current &&
            parentId === '-1' &&
            createPortal(
              <Small
                classes={{
                  className: cx(
                    classNamesWithTheme.label.name,
                    [classNamesWithTheme.label.modificators.hover, hover],
                    [classNamesWithTheme.label.modificators.selected, selected],
                  ),
                }}
                style={{
                  left: `${coordinates.x}px`,
                  top: `${coordinates.y}px`,
                }}
              >
                {t(`${translationNameSpace}.label.createFrame`)}
              </Small>,
              overlayContainerRef.current,
            )}
          <Elements
            eventsDisabled={false}
            isSelected={selected}
            mouseMode={mouseMode}
            parentId={id}
          />
        </>
      )}
    </Element>
  );
};

export default memo(Frame);
