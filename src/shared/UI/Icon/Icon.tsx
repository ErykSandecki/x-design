import { FC, HTMLAttributes, Ref, useMemo } from 'react';
import { kebabCase } from 'lodash';

// assets
import { Icons } from 'assets/svg';

// components
import Tooltip, { TTooltipProps } from '../Tooltip/Tooltip';

// hooks
import { useTheme } from 'hooks';
import { useSX } from '../hooks/sx/useSX';

// others
import { className, classNames, classes } from './classNames';

// styles
import styles from './icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import { TSX } from '../hooks/sx/types/types';
import { TSXPallete } from '../hooks/sx/types/pallete';
import { TUIProps } from '../types';

export type TIconProps = Omit<HTMLAttributes<HTMLOrSVGElement>, 'className'> &
  TUIProps<typeof classes, Omit<TSX, keyof TSXPallete>> & {
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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const isClickable = clickable && !disabled;
  const SVG = useMemo(() => Icons[name], [name]);
  const sxClassName = useSX(depsSx, sx);

  return (
    <Tooltip e2eAttribute={e2eAttribute} e2eValue={e2eValue || kebabCase(name)} {...tooltip}>
      <SVG
        className={cx(
          sxClassName,
          classes.className,
          classNamesWithTheme[className].name,
          [classNamesWithTheme[className].modificators[color], !isClickable],
          [classNamesWithTheme[className].modificators.clickable, isClickable],
          [classNamesWithTheme[className].modificators.disabled, disabled],
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
