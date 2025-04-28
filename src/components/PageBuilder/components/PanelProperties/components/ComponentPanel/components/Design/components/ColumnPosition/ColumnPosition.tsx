import { FC, useRef } from 'react';
import { first, size } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ConstrainsView from '../../../../../../../../shared/ConstrainsView/ConstrainsView';
import { ScrubbableInput, Small, UITools } from 'shared';

// hooks
import { usePositionEvents } from './hooks/usePositionEvents';

// others
import { MAX, MIN, translationNameSpace } from './constants';

// store
import {
  dynamicDataSelector,
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';
import { updateEventsStatus } from 'store/pageBuilder/actions';

// types
import { ColorsTheme, KeyboardKeys } from 'types';

// utils
import { getValue } from './utils/getValue';
import { handleSubmitInput } from 'utils';
import { hasSomeAlignment } from './utils/hasSomeAlignment';
import { isMixed } from './utils/isMixed';

const ColumnPosition: FC = () => {
  const dispatch = useDispatch();
  const dynamicData = useSelector(dynamicDataSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const refInputX = useRef<HTMLInputElement>(null);
  const refInputY = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const isMultiple = size(selectedElements) > 1;
  const hasAlignmentHorizontal = hasSomeAlignment(
    'horizontal',
    dynamicData,
    selectedElements,
  );
  const hasAlignmentVertical = hasSomeAlignment(
    'vertical',
    dynamicData,
    selectedElements,
  );
  const isMixedX = isMixed('x', dynamicData, firstElement, selectedElements);
  const isMixedY = isMixed('y', dynamicData, firstElement, selectedElements);
  const isRelative = selectedElements.some(
    ({ position }) => position === 'relative',
  );
  const disabledX = hasAlignmentHorizontal || isRelative;
  const disabledY = hasAlignmentVertical || isRelative;
  const showConstrains = hasAlignmentHorizontal || hasAlignmentVertical;
  const disabledAll =
    (hasAlignmentHorizontal || hasAlignmentVertical) && isMultiple;
  const { onBlurX, onBlurY, onChangeX, onChangeY, onMouseDown, x, y } =
    usePositionEvents(element, isMixedX, isMixedY, isMultiple, isRelative);

  return (
    <UITools.SectionColumn
      buttonsIcon={
        showConstrains
          ? [
              <ConstrainsView
                alignment={dynamicData[firstElement.id].alignment}
                key={0}
              />,
            ]
          : []
      }
      labels={[t(`${translationNameSpace}.label`)]}
    >
      <UITools.TextField
        disabled={disabledX || disabledAll}
        e2eValue="x"
        fullWidth
        onBlur={onBlurX}
        onChange={(event) => onChangeX(event.target.value)}
        onClick={() => refInputX.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputX.current)(event)
        }
        ref={refInputX}
        startAdornment={
          <ScrubbableInput
            disabled={disabledX || disabledAll}
            e2eValue="x"
            max={MAX}
            min={MIN}
            onChange={(value) => onChangeX(value.toString(), true)}
            onMouseDown={onMouseDown}
            onMouseUp={() =>
              dispatch(updateEventsStatus({ isMultipleMoving: false }))
            }
            value={isMultiple ? 0 : parseFloat(x)}
          >
            <Small color={ColorsTheme.neutral2}>X</Small>
          </ScrubbableInput>
        }
        type={isMixedX || hasAlignmentHorizontal ? 'text' : 'number'}
        value={getValue(disabledAll, hasAlignmentHorizontal, isMultiple, x)}
      />
      <UITools.TextField
        disabled={disabledY || disabledAll}
        e2eValue="y"
        fullWidth
        onBlur={onBlurY}
        onChange={(event) => onChangeY(event.target.value)}
        onClick={() => refInputY.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputY.current)(event)
        }
        ref={refInputY}
        startAdornment={
          <ScrubbableInput
            disabled={disabledY || disabledAll}
            e2eValue="y"
            max={MAX}
            min={MIN}
            onChange={(value) => onChangeY(value.toString(), true)}
            onMouseDown={onMouseDown}
            onMouseUp={() =>
              dispatch(updateEventsStatus({ isMultipleMoving: false }))
            }
            value={isMultiple ? 0 : parseFloat(y)}
          >
            <Small color={ColorsTheme.neutral2}>Y</Small>
          </ScrubbableInput>
        }
        type={isMixedY || hasAlignmentVertical ? 'text' : 'number'}
        value={getValue(disabledAll, hasAlignmentVertical, isMultiple, y)}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnPosition;
