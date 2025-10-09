import { cloneElement, FC, ReactNode, useRef, ReactElement } from 'react';
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
import { ColorsTheme, E2EAttribute, HTMLContainerId } from 'types';
import { TCarrotPlacement } from './types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';
import { TooltipPosition } from './enums';

// utils
import { getAttributes } from '../../../E2EDataAttributes/utils';

export type TTooltipProps = {
  autoPositioning?: boolean;
  autoPositioningHorizontal?: boolean;
  autoPositioningCarrotPlacement?: TCarrotPlacement;
  children: ReactElement<any, any>;
  className?: string;
  content: ReactNode | string;
  customId?: string;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  hide?: boolean;
  position?: TooltipPosition;
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
  e2eAttribute = E2EAttribute.tooltip,
  e2eValue = '',
  hide = false,
  position: initialPosition = TooltipPosition.topCenter,
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

  if (!content) {
    return cloneElement(children, getAttributes(e2eAttribute, e2eValue));
  }

  if (!container) {
    return null;
  }

  return (
    <>
      {cloneElement(children, {
        ...getAttributes(e2eAttribute, e2eValue),
        onMouseEnter,
        onMouseLeave,
        ref: elementRef,
      })}
      {createPortal(
        <div
          className={cx(className, classNamesWithTheme[classNameTooltip].name, [
            classNamesWithTheme[classNameTooltip].modificators.visible,
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
    </>
  );
};

export default Tooltip;
