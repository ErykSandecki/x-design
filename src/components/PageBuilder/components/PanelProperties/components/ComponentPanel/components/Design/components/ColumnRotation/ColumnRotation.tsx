import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnRotationInput from './ColumnRotationInput';
import { UITools } from 'shared';

// hooks
import { useRotationEvents } from './hooks/useRotationEvents';

// others
import { OPTIONS_BUTTONS, translationNameSpace } from './constants';

// types
import { GridColumnType } from 'shared/UITools/Section/components/SectionColumn/enums';

const ColumnRotation: FC = () => {
  const dispatch = useDispatch();
  const { element, ...rest } = useRotationEvents();
  const { t } = useTranslation();

  return (
    <UITools.SectionColumn gridColumnType={GridColumnType.twoInputs} labels={[t(`${translationNameSpace}.label`)]}>
      <ColumnRotationInput {...rest} />
      <UITools.ButtonGroup buttons={OPTIONS_BUTTONS(element.angle, dispatch, t)} e2eValue="layout-position" fullWidth />
    </UITools.SectionColumn>
  );
};

export default ColumnRotation;
