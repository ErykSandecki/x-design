import cx from 'classnames';
import { FC } from 'react';
import { size } from 'lodash';

// components
import { Small } from '../../../UI/Typography';

// others

// styles
import styles from './section-column-labels.module.scss';

export type TSectionColumnLabelsProps = {
  labels?: [string] | [string, string];
  width: string;
};

export const SectionColumnLabels: FC<TSectionColumnLabelsProps> = ({ labels = [], width }) => {
  return (
    <div className={cx(styles.SectionColumnLabels)} style={{ width }}>
      {!!size(labels) &&
        labels.map((label, index) => (
          <Small classes={{ className: cx(styles.SectionColumnLabels__label) }} key={index}>
            {label}
          </Small>
        ))}
    </div>
  );
};

export default SectionColumnLabels;
