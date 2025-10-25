import { FC, MouseEvent, ReactElement, useRef } from 'react';
import { useTranslation } from 'react-i18next';

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

// utils
import { getValueAsText } from './utils/getValueAsText';

export type TSelectProps = Omit<TTextFieldProps, 'endAdorment' | 'onChange'> & {
  children?: ReactElement | Array<ReactElement>;
  disabled?: boolean;
  enableTyping?: boolean;
  idContainerOptions?: string;
  isMixed?: boolean;
  onChange: TFunc<[string]>;
  onMouseEnterSelect?: TFunc<[MouseEvent]>;
  onMouseEnterOptions?: TFunc<[string]>;
  onMouseLeaveSelect?: TFunc<[MouseEvent]>;
  onMouseLeaveOptions?: TFunc<[string]>;
  translationNameSpace?: string;
  value: string;
};

export const Select: FC<TSelectProps> = ({
  children,
  disabled = false,
  e2eValue = '',
  enableTyping = false,
  idContainer,
  idContainerOptions,
  isMixed = false,
  onChange,
  onMouseEnterSelect,
  onMouseEnterOptions,
  onMouseLeaveSelect,
  onMouseLeaveOptions,
  translationNameSpace = '',
  variant = TextFieldVariant.outlined,
  value,
  ...restProps
}) => {
  const targetValue = isMixed ? 'Mixed' : value;
  const optionsRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(null);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();
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
      onMouseEnter={onMouseEnterSelect}
      onMouseLeave={onMouseLeaveSelect}
      ref={selectRef}
    >
      <TextField
        disabled={disabled}
        endAdorment={<Icon height={5} name="ChevronDown" style={{ marginRight: '5px' }} width={8} />}
        readOnly={!enableTyping}
        value={getValueAsText(isMixed, t, translationNameSpace, targetValue)}
        variant={variant}
        wrapperRef={wrapperRef}
        {...restProps}
      />
      <SelectOptions
        e2eValue={e2eValue}
        idContainer={idContainerOptions}
        onClick={onClickOption}
        onMouseEnterOptions={onMouseEnterOptions}
        onMouseLeaveOptions={onMouseLeaveOptions}
        ref={optionsRef}
        selected={selected}
        value={targetValue}
        wrapperRef={wrapperRef}
      >
        {children}
      </SelectOptions>
    </Box>
  );
};

export default Select;
