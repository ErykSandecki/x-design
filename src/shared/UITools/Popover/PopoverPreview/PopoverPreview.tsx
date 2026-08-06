import cx from 'classnames';
import { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

// components
import E2EDataAttribute from '../../../E2EDataAttributes/E2EDataAttribute';
import { P } from '../../../UI/Typography';

// core
import { usePopoverRoot } from '../PopoverRoot/core/PopoverRootProvider';

// others
import { translationNameSpace } from '../constants';

// styles
import styles from './popover-preview.module.scss';

// types
import { E2EAttribute } from 'types';

export type TPopoverPreviewProps = {
  children: ReactNode;
};

export const PopoverPreview: FC<TPopoverPreviewProps> = ({ children }) => {
  const { previewId } = usePopoverRoot();
  const { t } = useTranslation();

  return (
    <E2EDataAttribute type={E2EAttribute.popoverPreview} value="">
      <div className={cx(styles.PopoverPreview)}>
        {!previewId && <P style={{ opacity: 0.5 }}>{t(`${translationNameSpace}.preview`)}</P>}
        {children}
      </div>
    </E2EDataAttribute>
  );
};

export default PopoverPreview;
