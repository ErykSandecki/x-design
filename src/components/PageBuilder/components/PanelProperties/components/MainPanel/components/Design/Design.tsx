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
  const { format, value } = useSelector(pageBackgroundSelectorCreator('-1'));
  const { t } = useTranslation();

  return (
    <>
      <UITools.Section label={t(`${translationNameSpace}.section.1.label`)}>
        <UITools.ColorPicker
          format={format}
          onChange={(value) =>
            dispatch(changeBackground({ format, value }, '-1'))
          }
          onFormatChange={(format) =>
            dispatch(changeBackground({ format, value }, '-1'))
          }
          placement="leftBottom"
          value={value}
        />
      </UITools.Section>
    </>
  );
};

export default Design;
