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
    isMixedHeight,
    isMixedWidth,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    showHeightChip,
    showWidthChip,
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
        onBlur={onBlurWidth}
        onChange={onChangeWidth}
        popoverChildren={<PopoverWidth isMixed={isMixedWidth} width={elements[firstElement.id].width} />}
        showChip={showWidthChip}
        sizeType="width"
        value={width}
        valueScrubbaleInput={valueScrubbaleInputWidth}
      />
      <ColumnResizingInput
        e2eValue="height"
        onBlur={onBlurHeight}
        onChange={onChangeHeight}
        popoverChildren={<PopoverHeight height={elements[firstElement.id].height} isMixed={isMixedHeight} />}
        showChip={showHeightChip}
        sizeType="height"
        value={height}
        valueScrubbaleInput={valueScrubbaleInputHeight}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
