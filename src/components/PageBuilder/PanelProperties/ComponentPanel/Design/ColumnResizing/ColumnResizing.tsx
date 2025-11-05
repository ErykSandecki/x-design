import { FC } from 'react';
import { useDispatch } from 'react-redux';
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

const ColumnResizing: FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const {
    aspectRatio,
    elementHeight,
    elementWidth,
    height,
    heightMode,
    isMixedHeightMode,
    isMixedWidthMode,
    onBlurHeight,
    onBlurWidth,
    onChangeHeight,
    onChangeWidth,
    valueScrubbaleInputHeight,
    valueScrubbaleInputWidth,
    visibleAspectRatioButton,
    width,
    widthMode,
  } = useResizingEvents();

  return (
    <UITools.SectionColumn
      buttonsIcon={ColumnResizingButtonIcons(aspectRatio, dispatch, t, visibleAspectRatioButton)}
      gridColumnType={UITools.GridColumnType.twoInputs}
      labels={[t(`${translationNameSpace}.label`)]}
      withInputConnector={aspectRatio}
      withBottomMargin
    >
      <ColumnResizingInput
        e2eValue="width"
        isMixed={isMixedWidthMode}
        mode={widthMode}
        onBlur={onBlurWidth}
        onChange={onChangeWidth}
        popoverChildren={<PopoverWidth isMixed={isMixedWidthMode} width={elementWidth} />}
        sizeType="width"
        value={width}
        valueScrubbaleInput={valueScrubbaleInputWidth}
      />
      <ColumnResizingInput
        e2eValue="height"
        isMixed={isMixedHeightMode}
        mode={heightMode}
        onBlur={onBlurHeight}
        onChange={onChangeHeight}
        popoverChildren={<PopoverHeight height={elementHeight} isMixed={isMixedHeightMode} />}
        sizeType="height"
        value={height}
        valueScrubbaleInput={valueScrubbaleInputHeight}
      />
    </UITools.SectionColumn>
  );
};

export default ColumnResizing;
