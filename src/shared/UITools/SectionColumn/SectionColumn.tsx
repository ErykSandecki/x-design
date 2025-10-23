import { FC, ReactNode } from 'react';
import { size } from 'lodash';

// components
import Box from '../../UI/Box/Box';
import SectionColumnButtonIcons from './SectionColumnButtonIcons/SectionColumnButtonIcons';
import SectionColumnContent from './SectionColumnContent/SectionColumnContent';
import SectionColumnLabels from './SectionColumnLabels/SectionColumnLabels';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section-column.scss';

// types
import { E2EAttribute } from 'types';
import { GridColumnType } from './enums';

export type TSectionColumnProps = {
  buttonsIcon?: Array<ReactNode>;
  children: ReactNode;
  gridColumnType?: GridColumnType;
  labels?: [string] | [string, string];
  withInputConnector?: boolean;
  withMargin?: boolean;
};

export const SectionColumn: FC<TSectionColumnProps> = ({
  buttonsIcon,
  children,
  gridColumnType,
  labels,
  withInputConnector = false,
  withMargin = false,
}) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const buttonsWidthTotal = (size(buttonsIcon) || 1) * 24;
  const additionalGap = size(buttonsIcon) === 2 ? 2.5 : 0;
  const width = `calc(100% - ${buttonsWidthTotal}px - ${additionalGap}px - 8px)`;

  return (
    <Box
      classes={{
        className: cx(classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.withMargin,
          withMargin,
        ]),
      }}
      e2eAttribute={E2EAttribute.section}
    >
      <SectionColumnLabels labels={labels} width={width} />
      <Box sx={{ alignItems: 'center', columnGap: '8px', display: 'flex' }}>
        <SectionColumnContent gridColumnType={gridColumnType} width={width} withInputConnector={withInputConnector}>
          {children}
        </SectionColumnContent>
        <SectionColumnButtonIcons buttonsIcon={buttonsIcon} />
      </Box>
    </Box>
  );
};

export default SectionColumn;
