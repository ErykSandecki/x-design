import { FC } from 'react';
import { size } from 'lodash';

// components
import Box from '../../../UI/Box/Box';
import { Small } from '../../../UI/Typography';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './section-column-labels.scss';

export type TSectionColumnLabelsProps = {
  labels?: [string] | [string, string];
  width: string;
};

export const SectionColumnLabels: FC<TSectionColumnLabelsProps> = ({ labels = [], width }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{ className: cx(classNamesWithTheme[className]) }}
      style={{ width }}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      {!!size(labels) &&
        labels.map((label, index) => (
          <Small classes={{ className: cx(classNamesWithTheme.label) }} key={index}>
            {label}
          </Small>
        ))}
    </Box>
  );
};

export default SectionColumnLabels;
