import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// styles
import styles from './field-group.module.scss';

// types
import { E2EAttribute, TObject } from 'types';

// utils
import { mapAttributes } from 'utils';

export type TFieldGroupProps = {
  attributes?: TObject<any>;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
};

export const FieldGroup: FC<TFieldGroupProps> = ({ attributes = {}, children, e2eValue = '' }) => {
  return (
    <E2EDataAttribute type={E2EAttribute.fieldGroup} value={e2eValue}>
      <div className={cx(styles.FieldGroup)} {...mapAttributes(attributes)}>
        {children}
      </div>
    </E2EDataAttribute>
  );
};

export default FieldGroup;
