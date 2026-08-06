import cx from 'classnames';
import { FC, RefObject, useRef } from 'react';

// components
import TextFieldLabel from './TextFieldLabel/TextFieldLabel';
import TextFieldWrapper, { TTextFieldWrapperProps } from './TextFieldWrapper/TextFieldWrapper';
import Tooltip, { TTooltipProps } from '../../UI/Tooltip/Tooltip';

// others
import { getAttributes } from '../../E2EDataAttributes/utils';

// styles
import styles from './text-field.module.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TTextFieldProps = Omit<TTextFieldWrapperProps, 'e2eValue'> & {
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

  return (
    <Tooltip {...tooltip}>
      <div className={cx(className, styles.TextField)} {...getAttributes(E2EAttribute.textField, e2eValue)}>
        <TextFieldLabel label={label} />
        <TextFieldWrapper e2eValue={e2eValue} inputRef={inputRef} {...restProps} />
      </div>
    </Tooltip>
  );
};

export default TextField;
