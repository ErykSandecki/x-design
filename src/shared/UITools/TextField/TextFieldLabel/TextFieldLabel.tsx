import cx from 'classnames';
import { FC } from 'react';

// components
import { Small } from '../../../UI/Typography';

// others

// styles
import styles from './text-field-label.module.scss';

export type TTextFieldLabelProps = {
  label?: string;
};

export const TextFieldLabel: FC<TTextFieldLabelProps> = ({ label }) => {
  if (!label) {
    return null;
  }

  return <Small classes={{ className: cx(styles.TextFieldLabel) }}>{label}</Small>;
};

export default TextFieldLabel;
