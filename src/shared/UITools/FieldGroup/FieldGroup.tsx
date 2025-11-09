import { FC, ReactNode } from 'react';

// components
import Box from '../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './field-group.scss';

// types
import { E2EAttribute, TObject } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TFieldGroupProps = {
  attributes?: TObject<any>;
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
};

export const FieldGroup: FC<TFieldGroupProps> = ({ attributes = {}, children, e2eValue = '' }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      attributes={attributes}
      classes={{
        className: cx(classNamesWithTheme[className]),
      }}
      e2eAttribute={E2EAttribute.fieldGroup}
      e2eValue={e2eValue}
    >
      {children}
    </Box>
  );
};

export default FieldGroup;
