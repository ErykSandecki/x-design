import cx from 'classnames';
import { createPortal } from 'react-dom';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Element from '../Element/Element';
import Elements from '../Elements';
import { Box, Small } from 'shared';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// others
import { translationNameSpace } from './contants';

// styles
import styles from './frame.scss';

// types
import { TElementProps } from '../types';

// utils
import { getElementStickWallPosition } from 'components/PageBuilder/ViewBox/utils/getElementStickWallPosition';

const labelModificators: Record<string, string> = {
  bottom: 'Frame__label--bottom',
  hover: 'Frame__label--hover',
  left: 'Frame__label--left',
  right: 'Frame__label--right',
  selected: 'Frame__label--selected',
  top: 'Frame__label--top',
};

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

        return (
          <>
            {overlayContainerRef.current &&
              parentId === '-1' &&
              createPortal(
                <Box
                  classes={{ className: cx(styles.Frame__wrapper) }}
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
                      className: cx(styles.Frame__label, styles[labelModificators[stickWall]], {
                        [styles['Frame__label--hover']]: hover,
                        [styles['Frame__label--selected']]: selected,
                      }),
                    }}
                  >
                    {t(`${translationNameSpace}.label.createFrame`)}
                  </Small>
                </Box>,
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
