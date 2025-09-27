import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/components/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './field-group.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../../E2EDataAttributes/E2EDataAttribute';

export type TFieldGroupProps = {
  children: ReactNode;
  e2eValue?: TE2EDataAttributeProps['value'];
};

export const FieldGroup: FC<TFieldGroupProps> = ({ children, e2eValue = '' }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
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
