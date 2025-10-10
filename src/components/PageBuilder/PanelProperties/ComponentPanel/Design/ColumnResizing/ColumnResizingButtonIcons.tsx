import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// store
import { toggleAspectRatio } from 'store/pageBuilder/actions';

const ColumnResizingButtonIcons = (aspectRatio: boolean, visibleAspectRatioButton: boolean): Array<ReactNode> => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return visibleAspectRatioButton
    ? [
        <UITools.ButtonIcon
          e2eValue="aspect-ratio"
          key={0}
          name="AspectRatio"
          onClick={() => dispatch(toggleAspectRatio())}
          tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.lookAspectRatio`) }}
          selected={aspectRatio}
        />,
      ]
    : [];
};

export default ColumnResizingButtonIcons;
