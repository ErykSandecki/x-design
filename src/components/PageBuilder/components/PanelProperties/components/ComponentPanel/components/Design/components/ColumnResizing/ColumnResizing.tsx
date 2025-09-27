import { FC, useRef } from 'react';
import { first, size } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import HeightPopoverHeight from './components/HeightPopoverHeight/HeightPopoverHeight';
import HeightPopoverWidth from './components/HeightPopoverWidth/HeightPopoverWidth';
import { Icon, ScrubbableInput, Small, UITools } from 'shared';

// hooks
import { useResizingEvents } from './hooks/useResizingEvents';

// others
import { MAX, PANEL_PROPERTIES_ID } from '../../../../../../../../constants';
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
  const isMixedHeight = isMixed(dynamicData, firstElement, 'height.value', selectedElements);
  const isMixedWidth = isMixed(dynamicData, firstElement, 'width.value', selectedElements);
  const {
    height,
    isFocused,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    onFocus,
    unitHeight,
    unitWidth,
    width,
  } = useResizingEvents(element, isMixedHeight, isMixedWidth, isMultiple);
  const { t } = useTranslation();
  const isPureHeight = isPureNumber(height);
  const isPureWidth = isPureNumber(width);

  return (
    <UITools.SectionColumn gridColumnType={GridColumnType.twoInputs} labels={[t(`${translationNameSpace}.label`)]}>
      <UITools.TextField
        e2eValue="width"
        fullWidth
        idContainer={PANEL_PROPERTIES_ID}
        onBlur={onBlurWidth}
        onChange={(event) => onChangeWidth(sanitizeNumberInput(event.target.value))}
        onClick={() => refInputWidth.current.select()}
        onFocus={() => onFocus('width')}
        onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInputWidth.current)(event)}
        popoverChildren={<HeightPopoverWidth isMixed={isMixedWidth} width={dynamicData[firstElement.id].width} />}
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
              {isPureWidth ? (
                <Small color={ColorsTheme.neutral2}>W</Small>
              ) : (
                <Icon color={ColorsTheme.neutral2} height={12} name="WidthRestricted" width={12} />
              )}
            </ScrubbableInput>
            {isFocused !== 'width' && (!isPureWidth || unitWidth) && !isMixedWidth && (
              <UITools.Chip>
                {width}
                {unitWidth ?? ''}
              </UITools.Chip>
            )}
          </>
        }
        type={isMixedWidth || !isPureWidth ? 'text' : 'number'}
        value={(isPureWidth && (!unitWidth || isFocused === 'width')) || isMixedWidth ? width : ''}
      />
      <UITools.TextField
        e2eValue="height"
        fullWidth
        idContainer={PANEL_PROPERTIES_ID}
        onBlur={onBlurHeight}
        onChange={(event) => onChangeHeight(sanitizeNumberInput(event.target.value))}
        onClick={() => refInputHeight.current.select()}
        onFocus={() => onFocus('height')}
        onKeyDown={(event) => handleSubmitInput(KeyboardKeys.enter, refInputHeight.current)(event)}
        popoverChildren={<HeightPopoverHeight height={dynamicData[firstElement.id].height} isMixed={isMixedHeight} />}
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
              {isPureHeight ? (
                <Small color={ColorsTheme.neutral2}>H</Small>
              ) : (
                <Icon color={ColorsTheme.neutral2} height={12} name="HeightRestricted" width={12} />
              )}
            </ScrubbableInput>
            {isFocused !== 'height' && (!isPureHeight || unitHeight) && !isMixedHeight && (
              <UITools.Chip>
                {height}
                {unitHeight ?? ''}
              </UITools.Chip>
            )}
          </>
        }
        type={isMixedHeight || !isPureHeight ? 'text' : 'number'}
        value={(isPureHeight && (!unitHeight || isFocused === 'height')) || isMixedHeight ? height : ''}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
