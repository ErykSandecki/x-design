import { createPortal } from 'react-dom';
import { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Element from '../Element/Element';
import Elements from '../../Elements';
import { Box, Small } from 'shared';

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

// utils
import { getElementStickWallPosition } from 'components/PageBuilder/components/ViewBox/utils/getElementStickWallPosition';

export type TFrameProps = TElementProps;

const Frame: FC<TFrameProps> = ({ className, id, index, mouseMode, parentId, type }) => {
  const { overlayContainerRef } = useRefs();
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Element
      classes={{
        className: cx(className, classNamesWithTheme[classNameFrame]),
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
                  classes={{ className: cx(classNamesWithTheme.wrapper) }}
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
                      className: cx(
                        classNamesWithTheme.label.name,
                        [classNamesWithTheme.label.modificators.hover, hover],
                        [classNamesWithTheme.label.modificators.selected, selected],
                        classNamesWithTheme.label.modificators[stickWall],
                      ),
                    }}
                  >
                    {t(`${translationNameSpace}.label.createFrame`)}
                  </Small>
                </Box>,
                overlayContainerRef.current,
              )}
            <Elements eventsDisabled={false} isSelected={selected} mouseMode={mouseMode} parentId={id} />
          </>
        );
      }}
    </Element>
  );
};

export default memo(Frame);
