import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { useSelector } from 'react-redux';

// components
import { Box } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import {
  className as classNameMoveableELement,
  classNames,
  classes,
} from './classNames';
import { THROTTLE_WAIT } from './constants';

// store
import { elementDynamicDataSelectorCreator } from 'store/pageBuilder/selectors';

// styles
import styles from './moveable-element.scss';

// types
import { MouseMode } from 'components/PageBuilder/enums';

type TProps = {
  classes: typeof classes;
  children: ReactNode;
  depedencies?: Array<any>;
  handleMouseDown?: (event: MouseEvent | React.MouseEvent<HTMLElement>) => void;
  handleMouseMove?: (event: MouseEvent | React.MouseEvent<HTMLElement>) => void;
  handleMouseUp?: (event: MouseEvent | React.MouseEvent<HTMLElement>) => void;
  id: string;
  mouseMode: MouseMode;
};

const MoveableElement: FC<TProps> = ({
  classes,
  children,
  depedencies = [],
  handleMouseDown,
  handleMouseMove,
  handleMouseUp = null,
  id,
  mouseMode,
}) => {
  const elementDynamicData = useSelector(elementDynamicDataSelectorCreator(id));
  const [position, setPosition] = useState(elementDynamicData.positionAbsolute);
  const { height, width } = elementDynamicData;
  const { x, y } = position;
  const [isPressing, setIsPressing] = useState(false);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  const onMouseDownHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ): void => {
    if (event.button === 0 && mouseMode !== MouseMode.comment) {
      setIsPressing(true);

      if (handleMouseDown) {
        handleMouseDown(event);
      }
    }
  };

  const onMouseMoveHandler = throttle((event: MouseEvent): void => {
    if (handleMouseMove && isPressing && mouseMode !== MouseMode.comment) {
      handleMouseMove(event);
    }
  }, THROTTLE_WAIT);

  const onMouseUpHandler = (event: MouseEvent): void => {
    setIsPressing(false);

    if (handleMouseUp && isPressing) {
      handleMouseUp(event);
    }
  };

  useEffect(() => {
    if (isPressing) {
      document.addEventListener('mousemove', onMouseMoveHandler);
      document.addEventListener('mouseup', onMouseUpHandler);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMoveHandler);
      document.removeEventListener('mouseup', onMouseUpHandler);
    };
  }, [isPressing, mouseMode, ...depedencies]);

  return (
    <Box
      classes={{
        className: cx(
          classes.className,
          classNamesWithTheme[classNameMoveableELement],
        ),
      }}
      onMouseDown={onMouseDownHandler}
      style={{
        height: `${height}px`,
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
      }}
    >
      {children}
    </Box>
  );
};

export default memo(MoveableElement);
