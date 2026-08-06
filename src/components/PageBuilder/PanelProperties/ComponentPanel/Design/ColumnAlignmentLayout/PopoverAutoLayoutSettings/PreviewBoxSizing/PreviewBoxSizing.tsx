import cx from 'classnames';
import { FC } from 'react';

// others
import { PREVIEW_BOX_SIZING_MODIFICATORS, STROKE_MODIFICATORS } from './constants';

// styles
import styles from './preview-box-sizing.scss';

// types
import { TPreviewData } from 'shared';

export type TPreviewBoxSizingProps = Pick<TPreviewData, 'activeOption'>;

const PreviewBoxSizing: FC<TPreviewBoxSizingProps> = ({ activeOption }) => (
  <div className={cx(styles.PreviewBoxSizing, styles[PREVIEW_BOX_SIZING_MODIFICATORS[activeOption]])}>
    <div className={cx(styles['PreviewBoxSizing__tile-left'])}>
      <div className={cx(styles['PreviewBoxSizing__tile-children'])} />
    </div>
    <div className={cx(styles['PreviewBoxSizing__tile-right'])}>
      <div className={cx(styles['PreviewBoxSizing__tile-children'])} />
    </div>
    <div className={cx(styles.PreviewBoxSizing__stroke, styles[STROKE_MODIFICATORS[activeOption]])} />
  </div>
);

export default PreviewBoxSizing;
