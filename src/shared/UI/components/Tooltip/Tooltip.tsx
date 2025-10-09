import { CSSProperties, FC, ReactNode, useRef } from 'react';
import { createPortal } from 'react-dom';

// components
import Icon from '../Icon/Icon';

// hooks
import { useRenderContainer, useTheme } from 'hooks';
import { useUpdatePosition } from './hooks/useUpdatePosition';

// others
import { className as classNameTooltip, classNames } from './classNames';

// styles
import _styles from './styles/tooltip.scss';

// types
import { ColorsTheme, HTMLContainerId } from 'types';
import { TCarrotPlacement } from './types';
import { TooltipPosition } from './enums';

export type TTooltipProps = {
  autoPositioning?: boolean;
  autoPositioningHorizontal?: boolean;
  autoPositioningCarrotPlacement?: TCarrotPlacement;
  children: ReactNode;
  className?: string;
  content: ReactNode | string;
  customId?: string;
  hide?: boolean;
  position?: TooltipPosition;
  style?: CSSProperties;
  visible?: boolean;
};

export const Tooltip: FC<TTooltipProps> = ({
  autoPositioning = false,
  autoPositioningHorizontal = false,
  autoPositioningCarrotPlacement = undefined,
  children,
  className = '',
  content,
  customId = '',
  hide = false,
  position: initialPosition = TooltipPosition.topCenter,
  style = {},
  visible: initialVisible = false,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, _styles);
  const container = useRenderContainer(customId, HTMLContainerId.tooltip);
  const elementRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { onMouseEnter, onMouseLeave, position, styles, visible } = useUpdatePosition(
    autoPositioning,
    autoPositioningCarrotPlacement,
    autoPositioningHorizontal,
    elementRef,
    initialVisible,
    initialPosition,
    tooltipRef,
  );

  if (!container) {
    return null;
  }

  return (
    <div
      className={cx(className, classNamesWithTheme[classNameTooltip])}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={elementRef}
      style={style}
    >
      {children}
      {createPortal(
        <div
          className={cx(classNamesWithTheme.container.name, [
            classNamesWithTheme.container.modificators.visible,
            visible && !hide,
          ])}
          style={styles}
        >
          <div className={cx(classNamesWithTheme.content)} ref={tooltipRef}>
            {content}
            <Icon
              classes={{
                className: cx(classNamesWithTheme.carrot.name, classNamesWithTheme.carrot.modificators[position]),
              }}
              color={ColorsTheme.neutral3}
              height={14}
              name="CarrotDown"
              width={10}
            />
          </div>
        </div>,
        container,
      )}
    </div>
  );
};

export default Tooltip;
