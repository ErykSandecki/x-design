import cx from 'classnames';
import { FC, HTMLAttributes, Ref, useMemo } from 'react';
import { kebabCase } from 'lodash';

// assets
import { Icons } from 'assets/svg';

// components
import Tooltip, { TTooltipProps } from '../Tooltip/Tooltip';

// hooks
import { useSX } from '../hooks/sx/useSX';

// others

// styles
import styles from './icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TSX } from '../hooks/sx/types/types';
import { TSXPallete } from '../hooks/sx/types/pallete';
import { TUIProps } from '../types';

const iconModificators: Record<string, string> = {
  blue1: 'Icon--blue1',
  blue2: 'Icon--blue2',
  clickable: 'Icon--clickable',
  disabled: 'Icon--disabled',
  green1: 'Icon--green1',
  green2: 'Icon--green2',
  neutral1: 'Icon--neutral1',
  neutral2: 'Icon--neutral2',
  neutral3: 'Icon--neutral3',
  neutral4: 'Icon--neutral4',
  neutral5: 'Icon--neutral5',
  orange1: 'Icon--orange1',
  pink1: 'Icon--pink1',
  red1: 'Icon--red1',
  skyBlue1: 'Icon--skyBlue1',
  violet1: 'Icon--violet1',
};

export type TIconProps = Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'> &
  TUIProps<{ className: string }, Omit<TSX, keyof TSXPallete>> & {
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
  depsSx = [],
  disabled = false,
  e2eAttribute = E2EAttribute.icon,
  e2eValue = '',
  height = 16,
  name,
  ref,
  sx = {},
  tooltip = {},
  width = 16,
  ...restProps
}) => {
  const isClickable = clickable && !disabled;
  const SVG = useMemo(() => Icons[name], [name]);
  const sxClassName = useSX(depsSx, sx);

  return (
    <Tooltip e2eAttribute={e2eAttribute} e2eValue={e2eValue || kebabCase(name)} {...tooltip}>
      <SVG
        className={cx(
          sxClassName,
          classes.className,
          styles.Icon,
          { [styles[iconModificators[color]]]: !isClickable },
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
