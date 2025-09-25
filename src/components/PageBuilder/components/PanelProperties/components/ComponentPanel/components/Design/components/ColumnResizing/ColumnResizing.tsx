import { FC, useRef } from 'react';
import { first, size } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import { ScrubbableInput, Small, UITools } from 'shared';

// hooks
import { useResizingEvents } from './hooks/useResizingEvents';

// others
import { MAX } from '../../../../../../../../constants';
import { translationNameSpace } from './constants';

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
    'height',
    selectedElements,
  );
  const isMixedWidth = isMixed(
    dynamicData,
    firstElement,
    'width',
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
        onBlur={onBlurWidth}
        onChange={(event) =>
          onChangeWidth(sanitizeNumberInput(event.target.value))
        }
        onClick={() => refInputWidth.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputWidth.current)(event)
        }
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
            {!isPureWidth && <UITools.Chip>{width}</UITools.Chip>}
          </>
        }
        type={isMixedWidth || !isPureWidth ? 'text' : 'number'}
        value={isPureWidth ? width : ''}
      />
      <UITools.TextField
        e2eValue="height"
        fullWidth
        onBlur={onBlurHeight}
        onChange={(event) =>
          onChangeHeight(sanitizeNumberInput(event.target.value))
        }
        onClick={() => refInputHeight.current.select()}
        onKeyDown={(event) =>
          handleSubmitInput(KeyboardKeys.enter, refInputHeight.current)(event)
        }
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
            {!isPureHeight && <UITools.Chip>{height}</UITools.Chip>}
          </>
        }
        type={isMixedHeight || !isPureHeight ? 'text' : 'number'}
        value={isPureHeight ? height : ''}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
