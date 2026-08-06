import cx from 'classnames';
import { cloneElement, FC, ReactNode, useRef, ReactElement, RefObject } from 'react';
import { createPortal } from 'react-dom';

// components
import Icon from '../Icon/Icon';

// hooks
import { useRenderContainer } from 'hooks';
import { useUpdatePosition } from './hooks/useUpdatePosition';

// others

// styles
import _styles from './styles/tooltip.scss';

// types
import { E2EAttribute, HTMLContainerId } from 'types';
import { TCarrotPlacement } from './types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TooltipPosition } from './enums';

// utils
import { getAttributes } from '../../E2EDataAttributes/utils';

const carrotModificators: Record<string, string> = {
  bottomCenter: 'Tooltip__carrot--bottom-center',
  bottomEnd: 'Tooltip__carrot--bottom-end',
  bottomStart: 'Tooltip__carrot--bottom-start',
  leftCenter: 'Tooltip__carrot--left-center',
  leftEnd: 'Tooltip__carrot--left-end',
  leftStart: 'Tooltip__carrot--left-start',
  rightCenter: 'Tooltip__carrot--right-center',
  rightEnd: 'Tooltip__carrot--right-end',
  rightStart: 'Tooltip__carrot--right-start',
  topCenter: 'Tooltip__carrot--top-center',
  topEnd: 'Tooltip__carrot--top-end',
  topStart: 'Tooltip__carrot--top-start',
};

export type TTooltipProps = {
  autoPositioning?: boolean;
  autoPositioningHorizontal?: boolean;
  autoPositioningCarrotPlacement?: TCarrotPlacement;
  children: ReactElement<any, any>;
  className?: string;
  content?: ReactNode | string;
  customId?: string;
  e2eAttribute?: TE2EDataAttributeProps['type'];
  e2eValue?: TE2EDataAttributeProps['value'];
  hide?: boolean;
  position?: TooltipPosition;
  ref?: RefObject<HTMLElement>;
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
  ref,
  visible: initialVisible = false,
}) => {
  const container = useRenderContainer(customId, HTMLContainerId.tooltip);
  const elementRef = ref || useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { onMouseLeave, onMouseOver, position, styles, visible } = useUpdatePosition(
    autoPositioning,
    autoPositioningCarrotPlacement,
    autoPositioningHorizontal,
    elementRef,
    initialVisible,
    initialPosition,
    tooltipRef,
  );

  if (!content) {
    return cloneElement(children, { ...getAttributes(e2eAttribute, e2eValue), ref: elementRef });
  }

  if (!container) {
    return null;
  }

  return (
    <>
      {cloneElement(children, {
        ...getAttributes(e2eAttribute, e2eValue),
        onMouseLeave,
        onMouseOver,
        ref: elementRef,
      })}
      {createPortal(
        <div
          className={cx(className, _styles.Tooltip, {
            [_styles['Tooltip--visible']]: visible && !hide,
          })}
          style={styles}
        >
          <div className={cx(_styles.Tooltip__content)} ref={tooltipRef}>
            {content}
            <Icon
              classes={{
                className: cx(_styles.Tooltip__carrot, _styles[carrotModificators[position]]),
              }}
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
