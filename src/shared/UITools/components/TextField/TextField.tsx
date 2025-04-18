import { FC, InputHTMLAttributes, ReactNode } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'style'
> & {
  e2eValue?: TE2EDataAttributeProps['value'];
  endAdorment?: ReactNode;
  startAdornment?: ReactNode;
};

export const TextField: FC<TTextFieldProps> = ({
  e2eValue = '',
  endAdorment,
  startAdornment,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name),
      }}
      e2eAttribute={E2EAttribute.textField}
      e2eValue={e2eValue}
    >
      {startAdornment}
      <input
        className={cx(classNamesWithTheme.input)}
        maxLength={6}
        {...restProps}
      />
      {endAdorment}
    </Box>
  );
};

export default TextField;
