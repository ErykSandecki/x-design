import cx from 'classnames';
import { createPortal } from 'react-dom';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Element from '../Element/Element';
import Elements from '../Elements';
import { Small } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { LABEL_MODIFICATORS, translationNameSpace } from './constants';

// styles
import styles from './frame.scss';

// types
import { TElementProps } from '../types';

// utils
import { getElementStickWallPosition } from 'components/PageBuilder/ViewBox/utils/getElementStickWallPosition';

export type TFrameProps = TElementProps;

const Frame: FC<TFrameProps> = ({ className, id, index, mouseMode, parentId, type }) => {
  const { overlayContainerRef } = useRefs();
  const { t } = useTranslation();

  return (
    <Element
      classes={{
        className: cx(className, styles.Frame),
      }}
      id={id}
      index={index}
      parentId={parentId}
      mouseMode={mouseMode}
      type={type}
    >
      {(angle, coordinates, height, hover, selected, width) => {
        const stickWall = useMemo(() => getElementStickWallPosition(angle), [angle]);
        const isStickHorizontal = useMemo(() => stickWall === 'top' || stickWall === 'bottom', [stickWall]);

        return (
          <>
            {overlayContainerRef.current &&
              parentId === '-1' &&
              createPortal(
                <div
                  className={cx(styles.Frame__wrapper)}
                  style={{
                    height: `${height}px`,
                    left: `${coordinates.x}px`,
                    top: `${coordinates.y}px`,
                    transform: `rotate(${angle}deg)`,
                    width: `${width}px`,
                  }}
                >
                  <Small
                    classes={{
                      className: cx(styles.Frame__label, styles[LABEL_MODIFICATORS[stickWall]], {
                        [styles['Frame__label--hover']]: hover,
                        [styles['Frame__label--selected']]: selected,
                      }),
                    }}
                    style={{
                      width: `${isStickHorizontal ? width : height}px`,
                    }}
                  >
                    {t(`${translationNameSpace}.label.createFrame`)}
                  </Small>
                </div>,
                overlayContainerRef.current,
              )}
            <Elements eventsDisabled={false} id={id} mouseMode={mouseMode} parentId={id} />
          </>
        );
      }}
    </Element>
  );
};

export default memo(Frame);
