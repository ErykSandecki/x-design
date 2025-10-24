import { FC, RefObject, useRef } from 'react';

// components
import Box from '../../UI/Box/Box';
import TextFieldLabel from './TextFieldLabel/TextFieldLabel';
import TextFieldWrapper, { TTextFieldWrapperProps } from './TextFieldWrapper/TextFieldWrapper';
import Tooltip, { TTooltipProps } from '../../UI/Tooltip/Tooltip';

// hooks
import { useTheme } from 'hooks';

// others
import { className as textFieldClassName, classNames } from './classNames';

// styles
import styles from './text-field.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TTextFieldProps = TTextFieldWrapperProps & {
  className?: string;
  e2eValue?: TE2EDataAttributeProps['value'];
  label?: string;
  ref?: RefObject<HTMLInputElement>;
  tooltip?: Omit<TTooltipProps, 'children'>;
};

export const TextField: FC<TTextFieldProps> = ({
  className = '',
  e2eValue = '',
  label,
  inputRef: ref,
  tooltip,
  ...restProps
}) => {
  const inputRef = ref || useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Tooltip {...tooltip}>
      <Box
        classes={{
          className: cx(className, classNamesWithTheme[textFieldClassName]),
        }}
        e2eAttribute={E2EAttribute.textField}
        e2eValue={e2eValue}
      >
        <TextFieldLabel label={label} />
        <TextFieldWrapper e2eValue={e2eValue} inputRef={inputRef} {...restProps} />
      </Box>
    </Tooltip>
  );
};

export default TextField;
