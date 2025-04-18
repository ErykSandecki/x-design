import { FC, InputHTMLAttributes, ReactNode, Ref } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className as textFieldClassName, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TTextFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className' | 'color' | 'style'
> & {
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  endAdorment?: ReactNode;
  ref?: Ref<HTMLInputElement>;
  startAdornment?: ReactNode;
};

export const TextField: FC<TTextFieldProps> = ({
  className = '',
  e2eValue = '',
  endAdorment,
  ref,
  startAdornment,
  ...restProps
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[textFieldClassName].name),
      }}
      e2eAttribute={E2EAttribute.textField}
      e2eValue={e2eValue}
    >
      {startAdornment}
      <input
        className={cx(classNamesWithTheme.input)}
        maxLength={6}
        ref={ref}
        {...restProps}
      />
      {endAdorment}
    </Box>
  );
};

export default TextField;
