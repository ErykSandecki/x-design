import { FC, useRef } from 'react';
import { first, size } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, UITools } from 'shared';

// hooks
import { useRotationEvents } from './hooks/useRotationEvents';

// others
import { OPTIONS_BUTTONS, translationNameSpace } from './constants';

// store
import {
  dynamicDataSelector,
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { GridColumnType } from 'shared/UITools/components/Section/components/SectionColumn/enums';
import { KeyboardKeys } from 'types';

// utils
import { handleSubmitInput } from 'utils';
import { isMixed } from '../../utils/isMixed';

const ColumnRotation: FC = () => {
  const dispatch = useDispatch();
  const dynamicData = useSelector(dynamicDataSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const refInputAngle = useRef<HTMLInputElement>(null);
  const isMultiple = size(selectedElements) > 1;
  const isMixedAngle = isMixed(dynamicData, firstElement, 'angle', selectedElements);
  const { t } = useTranslation();
  const { angle, onBlur, onChange, onMouseDown } = useRotationEvents(element, isMixedAngle, isMultiple);

  return (
    <UITools.SectionColumn gridColumnType={GridColumnType.twoInputs} labels={[t(`${translationNameSpace}.label`)]}>
      <UITools.TextField
        e2eValue="angle"
        fullWidth
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
        onClick={() => refInputAngle.current.select()}
        onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInputAngle.current)(event)}
        ref={refInputAngle}
        startAdornment={
          <ScrubbableInput
            e2eValue="angle"
            icon="Protractor"
            iconHeight={8}
            iconWidth={8}
            loop
            max={180}
            min={-180}
            onChange={(value) => onChange(value.toString(), true)}
            onMouseDown={onMouseDown}
            onMouseUp={() => dispatch(updateEventsStatus({ isRotating: false }))}
            value={isMixedAngle ? 0 : parseFloat(angle)}
          />
        }
        type={isMixedAngle ? 'text' : 'number'}
        value={angle}
      />
      <UITools.ButtonGroup buttons={OPTIONS_BUTTONS(element.angle, dispatch)} e2eValue="layout-position" fullWidth />
    </UITools.SectionColumn>
  );
};

export default ColumnRotation;
