import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// store
import { addVariant } from 'store/pageBuilder/actions';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

const DesignFillButtonIcons: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return [
    <UITools.ButtonIcon
      disabledSelection
      iconSize={14}
      key={0}
      name="PlusOutlined"
      onClick={() =>
        dispatch(
          addVariant('background', {
            properties: { alpha: '100', color: '#ffffff', format: 'hex', mode: 'fixed' },
            visible: true,
          }),
        )
      }
      tooltip={{ autoPositioning: true, content: t(`${TOOLTIP_TRANSLATION_KEY}.addFill`) }}
    />,
  ];
};

export default DesignFillButtonIcons;
