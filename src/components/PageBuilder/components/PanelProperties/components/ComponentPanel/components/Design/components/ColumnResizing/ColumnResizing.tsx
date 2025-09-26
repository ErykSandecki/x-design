import { FC, useRef } from 'react';
import { first, size } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, Small, UITools } from 'shared';

// hooks
import { useResizingEvents } from './hooks/useResizingEvents';

// others
import {
  heightPopoverData,
  translationNameSpace,
  widthPopoverData,
} from './constants';
import { MAX, PANEL_PROPERTIES_ID } from '../../../../../../../../constants';

// store
import {
  dynamicDataSelector,
  elementAllDataSelectorCreator,
  selectedElementsSelector,
} from 'store/pageBuilder/selectors';

// types
import { GridColumnType } from 'shared/UITools/components/Section/components/SectionColumn/enums';
import { ColorsTheme, KeyboardKeys } from 'types';

// utils
import { handleSubmitInput, isPureNumber, sanitizeNumberInput } from 'utils';
import { isMixed } from '../../utils/isMixed';

const ColumnResizing: FC = () => {
  const dispatch = useDispatch();
  const dynamicData = useSelector(dynamicDataSelector);
  const refInputHeight = useRef<HTMLInputElement>(null);
  const refInputWidth = useRef<HTMLInputElement>(null);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const element = useSelector(elementAllDataSelectorCreator(firstElement.id));
  const isMultiple = size(selectedElements) > 1;
  const isMixedHeight = isMixed(
    dynamicData,
    firstElement,
    'height.value',
    selectedElements,
  );
  const isMixedWidth = isMixed(
    dynamicData,
    firstElement,
    'width.value',
    selectedElements,
  );
  const {
    height,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    width,
  } = useResizingEvents(element, isMixedHeight, isMixedWidth, isMultiple);
  const { t } = useTranslation();
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);

  return (
    <UITools.SectionColumn
      gridColumnType={GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
    >
      <UITools.TextField
        e2eValue="width"
        fullWidth
        idContainer={PANEL_PROPERTIES_ID}
        onBlur={onBlurWidth}
        onChange={(event) =>
          onChangeWidth(sanitizeNumberInput(event.target.value))
        }
        onClick={() => refInputWidth.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputWidth.current)(event)
        }
        popoverChildren={widthPopoverData(
          dispatch,
          isMixedWidth,
          t,
          dynamicData[firstElement.id].width,
        )}
        ref={refInputWidth}
        startAdornment={
          <>
            <ScrubbableInput
              disabled={!isPureWidth}
              e2eValue="width"
              max={MAX}
              min={0}
              onChange={(value) => onChangeWidth(value.toString(), true)}
              value={isMultiple ? 0 : parseFloat(width)}
            >
              <Small color={ColorsTheme.neutral2}>W</Small>
            </ScrubbableInput>
            {!isPureWidth && !isMixedWidth && (
              <UITools.Chip>{width}</UITools.Chip>
            )}
          </>
        }
        type={isMixedWidth || !isPureWidth ? 'text' : 'number'}
        value={isPureWidth || isMixedWidth ? width : ''}
      />
      <UITools.TextField
        e2eValue="height"
        fullWidth
        idContainer={PANEL_PROPERTIES_ID}
        onBlur={onBlurHeight}
        onChange={(event) =>
          onChangeHeight(sanitizeNumberInput(event.target.value))
        }
        onClick={() => refInputHeight.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputHeight.current)(event)
        }
        popoverChildren={heightPopoverData(
          dispatch,
          dynamicData[firstElement.id].height,
          isMixedHeight,
          t,
        )}
        ref={refInputHeight}
        startAdornment={
          <>
            <ScrubbableInput
              disabled={!isPureHeight}
              e2eValue="height"
              max={MAX}
              min={0}
              onChange={(value) => onChangeHeight(value.toString(), true)}
              value={isMultiple ? 0 : parseFloat(height)}
            >
              <Small color={ColorsTheme.neutral2}>H</Small>
            </ScrubbableInput>
            {!isPureHeight && !isMixedHeight && (
              <UITools.Chip>{height}</UITools.Chip>
            )}
          </>
        }
        type={isMixedHeight || !isPureHeight ? 'text' : 'number'}
        value={isPureHeight || isMixedHeight ? height : ''}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
