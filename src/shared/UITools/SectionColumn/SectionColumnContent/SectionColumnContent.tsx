import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
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
    <div
      className={cx(styles.SectionColumnContent, styles[sectionColumnContentModificators[gridColumnType]])}
      style={{ width }}
    >
      {children}
      {withInputConnector && (
        <div className={cx(styles['SectionColumnContent__input-connector'])}>
          <Icon color={ColorsTheme.neutral3} height={24} name="InputsConnector" width={24} />
        </div>
      )}
    </div>
  );
};

export default SectionColumnContent;
