import { FC, ReactElement, useRef } from 'react';

// components
import Box from '../../UI/Box/Box';
import Icon from '../../UI/Icon/Icon';
import SelectOptions from './SelectOptions/SelectOptions';
import TextField, { TTextFieldProps } from '../TextField/TextField';

// hooks
import { useSelectEvents } from './hooks/useSelectEvents';
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './select.scss';

// types
import { E2EAttribute } from 'types';
import { TextFieldVariant } from '../TextField/enums';

export type TSelectProps = Omit<TTextFieldProps, 'endAdorment' | 'onChange'> & {
  children?: ReactElement | Array<ReactElement>;
  disabled?: boolean;
  enableTyping?: boolean;
  idContainerOptions?: string;
  onChange: TFunc<[string]>;
  value: string;
};

export const Select: FC<TSelectProps> = ({
  children,
  disabled = false,
  e2eValue = '',
  enableTyping = false,
  idContainer,
  idContainerOptions,
  onChange,
  variant = TextFieldVariant.outlined,
  value,
  ...restProps
}) => {
  const optionsRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(null);
  const wrapperRef = useRef(null);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { onClickOption, onClickSelect, selected } = useSelectEvents(idContainer, onChange, selectRef);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.disabled,
          disabled,
        ]),
      }}
      e2eAttribute={E2EAttribute.select}
      e2eValue={e2eValue}
      onClick={onClickSelect}
      ref={selectRef}
    >
      <TextField
        disabled={disabled}
        endAdorment={<Icon height={5} name="ChevronDown" style={{ marginRight: '5px' }} width={8} />}
        readOnly={!enableTyping}
        value={value}
        variant={variant}
        wrapperRef={wrapperRef}
        {...restProps}
      />
      <SelectOptions
        e2eValue={e2eValue}
        idContainer={idContainerOptions}
        onClick={onClickOption}
        ref={optionsRef}
        selected={selected}
        value={value}
        wrapperRef={wrapperRef}
      >
        {children}
      </SelectOptions>
    </Box>
  );
};

export default Select;
