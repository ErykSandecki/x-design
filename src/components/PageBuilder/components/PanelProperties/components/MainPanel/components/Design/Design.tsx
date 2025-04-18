import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { UITools } from 'shared';

// others
import { translationNameSpace } from './constants';

// store
import { changeBackground } from 'store/pageBuilder/actions';
import { pageBackgroundSelectorCreator } from 'store/pageBuilder/selectors';

export type TDesign = {};

const Design: FC<TDesign> = () => {
  const dispatch = useDispatch();
  const { alpha, format, value } = useSelector(
    pageBackgroundSelectorCreator('-1'),
  );
  const { t } = useTranslation();

  return (
    <>
      <UITools.Section label={t(`${translationNameSpace}.section.1.label`)}>
        <UITools.ColorPicker
          alpha={alpha}
          color={value}
          format={format}
          onChangeAlpha={(alpha) =>
            dispatch(changeBackground({ alpha, format, value }, '-1'))
          }
          onChangeColor={(alpha, value) =>
            dispatch(changeBackground({ alpha, format, value }, '-1'))
          }
          onFormatChange={(format) =>
            dispatch(changeBackground({ alpha, format, value }, '-1'))
          }
          placement="leftBottom"
        />
      </UITools.Section>
    </>
  );
};

export default Design;
