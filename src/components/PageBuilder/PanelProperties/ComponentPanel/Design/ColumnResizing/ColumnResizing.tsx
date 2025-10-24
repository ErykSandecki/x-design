import { FC } from 'react';
import { first } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// components
import ColumnResizingButtonIcons from './ColumnResizingButtonIcons';
import ColumnResizingInput from './ColumnResizingInput';
import PopoverHeight from './PopoverHeight/PopoverHeight';
import PopoverWidth from './PopoverWidth/PopoverWidth';
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
  const dispatch = useDispatch();
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
      buttonsIcon={ColumnResizingButtonIcons(aspectRatio, dispatch, t, visibleAspectRatioButton)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withInputConnector={aspectRatio}
      withMargin
    >
      <ColumnResizingInput
        e2eValue="width"
        inputType={inputWidthType}
        isPure={isPureWidth}
        onBlur={onBlurWidth}
        onChange={onChangeWidth}
        onFocus={onFocus}
        popoverChildren={<PopoverWidth isMixed={isMixedWidth} width={elements[firstElement.id].width} />}
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
        popoverChildren={<PopoverHeight height={elements[firstElement.id].height} isMixed={isMixedHeight} />}
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
