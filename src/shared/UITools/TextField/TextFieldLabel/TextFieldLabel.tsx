import { FC } from 'react';

// components
import { Small } from '../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './text-field-label.scss';

export type TTextFieldLabelProps = {
  label?: string;
};

export const TextFieldLabel: FC<TTextFieldLabelProps> = ({ label }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  if (!label) {
    return null;
  }

  return <Small classes={{ className: cx(classNamesWithTheme[className]) }}>{label}</Small>;
};

export default TextFieldLabel;
