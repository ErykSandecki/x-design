import cx from 'classnames';
import { FC, HTMLAttributes, Ref, useMemo } from 'react';
import { kebabCase } from 'lodash';

// assets
import { Icons } from 'assets/svg';

// components
import Tooltip, { TTooltipProps } from '../Tooltip/Tooltip';

// others
import { ICON_MODIFICATORS } from './constants';

// styles
import styles from './icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TUIProps } from '../types';

export type TIconProps = Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'> &
  TUIProps<{ className: string }> & {
    clickable?: boolean;
    color?: ColorsTheme;
    disabled?: boolean;
    e2eAttribute?: TE2EDataAttributeProps['type'];
    e2eValue?: TE2EDataAttributeProps['value'];
    height?: number;
    name: keyof typeof Icons;
    ref?: Ref<SVGSVGElement>;
    tooltip?: Omit<TTooltipProps, 'children'>;
    width?: number;
  };

export const Icon: FC<TIconProps> = ({
  clickable = false,
  classes = { className: '' },
  color = ColorsTheme.neutral1,
  disabled = false,
  e2eAttribute = E2EAttribute.icon,
  e2eValue = '',
  height = 16,
  name,
  ref,
  tooltip = {},
  width = 16,
  ...restProps
}) => {
  const isClickable = clickable && !disabled;
  const SVG = useMemo(() => Icons[name], [name]);

  return (
    <Tooltip e2eAttribute={e2eAttribute} e2eValue={e2eValue || kebabCase(name)} {...tooltip}>
      <SVG
        className={cx(
          classes.className,
          styles.Icon,
          { [styles[ICON_MODIFICATORS[color]]]: !isClickable },
          { [styles['Icon--clickable']]: isClickable },
          { [styles['Icon--disabled']]: disabled },
        )}
        height={height}
        name={name}
        ref={ref}
        width={width}
        {...restProps}
      />
    </Tooltip>
  );
};

export default Icon;
