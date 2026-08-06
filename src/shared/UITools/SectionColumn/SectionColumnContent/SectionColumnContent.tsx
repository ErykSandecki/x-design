import cx from 'classnames';
import { FC, ReactNode } from 'react';

// components
import Icon from '../../../UI/Icon/Icon';

// others
import { SECTION_COLUMN_CONTENT_MODIFICATORS } from './constants';

// styles
import styles from './section-column-content.module.scss';

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
  return (
    <div
      className={cx(styles.SectionColumnContent, styles[SECTION_COLUMN_CONTENT_MODIFICATORS[gridColumnType]])}
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
