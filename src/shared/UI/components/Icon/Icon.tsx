import { FC, HTMLAttributes, Ref, useMemo } from 'react';

// assets
import { Icons } from 'assets/svg';

// components
import E2EDataAttribute, {
  TE2EDataAttributeProps,
} from '../../../E2EDataAttributes/E2EDataAttribute';

// hooks
import { useTheme } from 'hooks';
import { useSX } from '../../hooks/sx/useSX';

// others
import { className, classNames, classes } from './classNames';

// styles
import styles from './icon.scss';

// types
import { ColorsTheme, E2EAttribute } from 'types';
import { TSX } from '../../hooks/sx/types/types';
import { TSXPallete } from '../../hooks/sx/types/pallete';
import { TUIProps } from '../../types';

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
  sx = {},
  width = 16,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const isClickable = clickable && !disabled;
  const SVG = useMemo(() => Icons[name], [name]);
  const sxClassName = useSX(sx);

  return (
    <E2EDataAttribute type={e2eAttribute} value={e2eValue || name}>
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
    </E2EDataAttribute>
  );
};

export default Icon;
