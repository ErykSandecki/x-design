import cx from 'classnames';
import { FC } from 'react';
import { size } from 'lodash';

// components
import Box from '../../../UI/Box/Box';
import { Small } from '../../../UI/Typography';

// others

// styles
import styles from './section-column-labels.scss';

export type TSectionColumnLabelsProps = {
  labels?: [string] | [string, string];
  width: string;
};

export const SectionColumnLabels: FC<TSectionColumnLabelsProps> = ({ labels = [], width }) => {
  return (
    <Box
      classes={{ className: cx(styles.SectionColumnLabels) }}
      style={{ width }}
      sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}
    >
      {!!size(labels) &&
        labels.map((label, index) => (
          <Small classes={{ className: cx(styles.SectionColumnLabels__label) }} key={index}>
            {label}
          </Small>
        ))}
    </Box>
  );
};

export default SectionColumnLabels;
