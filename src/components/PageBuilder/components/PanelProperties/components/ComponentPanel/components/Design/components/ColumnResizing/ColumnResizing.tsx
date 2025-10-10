import { FC } from 'react';
import { first } from 'lodash';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnResizingButtonIcons from './ColumnResizingButtonIcons';
import ColumnResizingInput from './ColumnResizingInput';
import HeightPopoverHeight from './components/HeightPopoverHeight/HeightPopoverHeight';
import HeightPopoverWidth from './components/HeightPopoverWidth/HeightPopoverWidth';
import { UITools } from 'shared';

// hooks
import { useResizingEvents } from './hooks/useResizingEvents';

// others
import { translationNameSpace } from './constants';

// store
import { elementsSelector, selectedElementsSelector } from 'store/pageBuilder/selectors';

const ColumnResizing: FC = () => {
  const elements = useSelector(elementsSelector);
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const { t } = useTranslation();

  const {
    aspectRatio,
    height,
    inputHeightType,
    inputWidthType,
    isMixedHeight,
    isMixedWidth,
    isPureHeight,
    isPureWidth,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    onFocus,
    showHeightChip,
    showWidthChip,
    unitHeight,
    unitWidth,
    valueInputHeight,
    valueInputWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
  } = useResizingEvents();

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnResizingButtonIcons(aspectRatio, visibleAspectRatioButton)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      inputConnector={aspectRatio}
      labels={[t(`${translationNameSpace}.label`)]}
      withMargin
    >
      <ColumnResizingInput
        e2eValue="width"
        inputType={inputWidthType}
        isPure={isPureWidth}
        onBlur={onBlurWidth}
        onChange={onChangeWidth}
        onFocus={onFocus}
        popoverChildren={<HeightPopoverWidth isMixed={isMixedWidth} width={elements[firstElement.id].width} />}
        showChip={showWidthChip}
        size={width}
        sizeType="width"
        unitSize={unitWidth}
        valueInput={valueInputWidth}
        valueScrubbaleInput={valueScrubbaleInputWidth}
      />
      <ColumnResizingInput
        e2eValue="height"
        inputType={inputHeightType}
        isPure={isPureHeight}
        onBlur={onBlurHeight}
        onChange={onChangeHeight}
        onFocus={onFocus}
        popoverChildren={<HeightPopoverHeight height={elements[firstElement.id].height} isMixed={isMixedHeight} />}
        showChip={showHeightChip}
        size={height}
        sizeType="height"
        unitSize={unitHeight}
        valueInput={valueInputHeight}
        valueScrubbaleInput={valueScrubbaleInputHeight}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
