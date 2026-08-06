import cx from 'classnames';
import { FC, MouseEvent, ReactElement, useRef } from 'react';
import { noop } from 'lodash';
import { useTranslation } from 'react-i18next';

// components
import E2EDataAttribute from '../../E2EDataAttributes/E2EDataAttribute';
import Icon from '../../UI/Icon/Icon';
import SelectOptions from './SelectOptions/SelectOptions';
import TextField, { TTextFieldProps } from '../TextField/TextField';

// hooks
import { useSelectEvents } from './hooks/useSelectEvents';

// others
import { MIXED } from 'constant/constants';

// styles
import styles from './select.module.scss';

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
  onClose?: TFunc;
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
  onClose = noop,
  onMouseEnterSelect,
  onMouseEnterOptions,
  onMouseLeaveSelect,
  onMouseLeaveOptions,
  translationNameSpace = '',
  variant = TextFieldVariant.outlined,
  value,
  ...restProps
}) => {
  const targetValue = isMixed ? MIXED : value;
  const optionsRef = useRef<HTMLUListElement>(null);
  const selectRef = useRef(null);
  const wrapperRef = useRef(null);
  const { t } = useTranslation();

  const { onClickOption, onClickSelect, selected } = useSelectEvents(
    idContainer,
    onChange,
    onClose,
    optionsRef,
    selectRef,
  );

  return (
    <E2EDataAttribute type={E2EAttribute.select} value={e2eValue}>
      <div
        className={cx(styles.Select, {
          [styles['Select--disabled']]: disabled,
        })}
        onClick={onClickSelect}
        onMouseEnter={onMouseEnterSelect}
        onMouseLeave={onMouseLeaveSelect}
        ref={selectRef}
      >
        <TextField
          disabled={disabled}
          disabledSelection
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
      </div>
    </E2EDataAttribute>
  );
};

export default Select;
