import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import Box from '../../../UI/Box/Box';
import Icon from '../../../UI/Icon/Icon';

// others

// styles
import styles from './section-column-content.scss';

// types
import { ColorsTheme } from 'types';
import { GridColumnType } from '../enums';

const sectionColumnContentModificators: Record<string, string> = {
  oneByTwo: 'SectionColumnContent--one-by-two',
  single: 'SectionColumnContent--single',
  twoInputs: 'SectionColumnContent--two-inputs',
};

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
  return (
    <Box
      classes={{
        className: cx(styles.SectionColumnContent, styles[sectionColumnContentModificators[gridColumnType]]),
      }}
      style={{ width }}
      sx={{ display: 'grid', position: 'relative' }}
    >
      {children}
      {withInputConnector && (
        <Box
          classes={{
            className: cx(styles['SectionColumnContent__input-connector']),
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
