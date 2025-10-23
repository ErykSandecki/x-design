import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section-column-content.scss';

// types
import { ColorsTheme } from 'types';
import { GridColumnType } from '../enums';

export type TSectionColumnContentProps = {
  children: ReactNode;
  gridColumnType?: GridColumnType;
  width: string;
  withInputConnector?: boolean;
};

export const SectionColumnContent: FC<TSectionColumnContentProps> = ({
  children,
  gridColumnType = GridColumnType.single,
  width,
  withInputConnector = false,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, classNamesWithTheme[className].modificators[gridColumnType]),
      }}
      style={{ width }}
      sx={{ display: 'grid', position: 'relative' }}
    >
      {children}
      {withInputConnector && (
        <Box
          classes={{
            className: cx(classNamesWithTheme.inputConnector),
          }}
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            left: '50%',
            position: 'absolute',
            top: '50%',
          }}
        >
          <Icon color={ColorsTheme.neutral3} height={24} name="InputsConnector" width={24} />
        </Box>
      )}
    </Box>
  );
};

export default SectionColumnContent;
