import { FC } from 'react';
import { camelCase } from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { Icon, UITools } from 'shared';

// hooks
import { useBlendModeEvents } from './hooks/useBlendModeEvents';

// others
import { BLEND_MODES_STRUCTURE } from 'constant/blendModeStructure';
import { COMMON_TRANSLATION_KEY } from 'constant/constants';
import { PANEL_PROPERTIES_ID } from '../../../../constants';
import { translationNameSpace } from './constants';

// store
import { changeProperties } from 'store/pageBuilder/actions';

// types
import { BlendMode } from 'types';
import ColumnBlendModeButtonIcons from './ColumnBlendModeButtonIcons';

const ColumnBlendMode: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isMixedBlendMode, mixBlendMode } = useBlendModeEvents();

  if (mixBlendMode === BlendMode.initial) {
    return null;
  }

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnBlendModeButtonIcons(dispatch, t)}
      gridColumnType={UITools.GridColumnType.single}
      labels={[t(`${translationNameSpace}.label`)]}
      withBottomMargin
    >
      <UITools.Select
        e2eValue="blend-mode"
        idContainer={PANEL_PROPERTIES_ID}
        isMixed={isMixedBlendMode}
        onChange={(mixBlendMode) => dispatch(changeProperties({ mixBlendMode: mixBlendMode as BlendMode }))}
        startAdornment={<Icon height={10} name="DropFilled" width={10} />}
        translationNameSpace={COMMON_TRANSLATION_KEY}
        value={mixBlendMode}
      >
        {BLEND_MODES_STRUCTURE.map(({ blendMode, component }) =>
          component === 'item' ? (
            <UITools.SelectItem key={blendMode} value={blendMode}>
              {t(`${COMMON_TRANSLATION_KEY}.${camelCase(blendMode)}`)}
            </UITools.SelectItem>
          ) : (
            <UITools.SelectSeparator key={blendMode} />
          ),
        )}
      </UITools.Select>
    </UITools.SectionColumn>
  );
};

export default ColumnBlendMode;
